package com.edir.app.contribution.application.services;

import com.edir.app.contribution.application.exceptions.OpenContributionNotFoundException;
import com.edir.app.contribution.application.exceptions.UnClosedContributionFoundException;
import com.edir.app.contribution.application.ports.in.commands.CreateContributionCommand;
import com.edir.app.contribution.application.ports.in.usecases.ContributionUseCase;
import com.edir.app.contribution.application.ports.out.ContributionRepository;
import com.edir.app.contribution.application.ports.out.MemberContributionRepository;
import com.edir.app.contribution.domain.ContributionDomainService;
import com.edir.app.contribution.domain.entity.Contribution;
import com.edir.app.contribution.domain.entity.MemberContribution;
import com.edir.app.contribution.domain.valueobjects.ContributionId;
import com.edir.app.contribution.domain.valueobjects.DateRange;
import com.edir.app.contribution.domain.valueobjects.PenaltyPolicy;
import com.edir.app.contribution.domain.valueobjects.PenaltyType;
import com.edir.app.shared.application.usecase.UseCase;
import com.edir.app.shared.domain.event.DomainEventPublisher;
import com.edir.app.shared.domain.valueobjects.Money;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@AllArgsConstructor
@UseCase
class ContributionService implements ContributionUseCase {
    private final ContributionRepository contributionRepository;
    private final MemberContributionRepository memberContributionRepository;
    private final DomainEventPublisher publisher;
    private final ContributionDomainService contributionDomainService;

    @Override
    public ContributionId createContribution(CreateContributionCommand command) {
        Optional<Contribution> openContribution = contributionRepository.findOpenContribution();
        log.info("Checking existing open contribution");

        if (openContribution.isPresent()) {
            log.error("An open contribution already exists");
            throw new UnClosedContributionFoundException("An open contribution already exists");
        }

        log.info("Creating contribution");
        Contribution contribution = Contribution
            .createContributionWithPenaltyPolicy(command.name(),
                command.description(),
                new DateRange(command.startDate(), command.endDate()),
                new Money(command.contributionAmount()),
                command.dueDate(),
                PenaltyType.FIXED.equals(command.penaltyType()) ? PenaltyPolicy.fixed(new Money(command.penaltyAmount()))
                    : PenaltyPolicy.percentage(new Money(command.penaltyAmount()))
            );

        ContributionId contributionId = contributionRepository.save(contribution);

        log.info("Contribution created successfully,with contribution id: {}", contributionId);

        publisher.publishEvent(contribution);
        return contributionId;
    }

    @Override
    public void closeContribution() {
        Contribution contribution = contributionRepository
            .findOpenContribution()
            .orElseThrow(OpenContributionNotFoundException::new);

        List<MemberContribution> ledgers = memberContributionRepository
            .findByContributionId(contribution.getId());

        for (MemberContribution ledger : ledgers) {
            contributionDomainService.close(contribution, ledger, ZonedDateTime.now());
            memberContributionRepository.save(ledger);
        }

        contribution.closePeriod();
        contributionRepository.save(contribution);
        log.info("Contribution closed successfully");
        publisher.publishEvent(contribution);
    }
}
