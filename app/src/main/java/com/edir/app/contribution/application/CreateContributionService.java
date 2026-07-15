package com.edir.app.contribution.application;

import com.edir.app.contribution.application.commands.CreateContributionCommand;
import com.edir.app.contribution.application.exceptions.UnClosedContributionFoundException;
import com.edir.app.contribution.application.usecases.CreateContributionUseCase;
import com.edir.app.contribution.domain.entity.Contribution;
import com.edir.app.contribution.domain.ports.ContributionRepository;
import com.edir.app.contribution.domain.valueobjects.DateRange;
import com.edir.app.contribution.domain.valueobjects.PenaltyPolicy;
import com.edir.app.contribution.domain.valueobjects.PenaltyType;
import com.edir.app.shared.domain.event.DomainEventPublisher;
import com.edir.app.shared.domain.valueobjects.Money;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Slf4j
@Service
@Transactional
public class CreateContributionService implements CreateContributionUseCase {
    private final ContributionRepository contributionRepository;

    private final DomainEventPublisher publisher;

    @Override
    public UUID execute(CreateContributionCommand command) {
        Optional<Contribution> openContribution = contributionRepository.findOpenContribution();
        log.info("Checking existing open contribution");
        if (openContribution.isPresent()) {
            log.error("An open contribution already exists");
            throw new UnClosedContributionFoundException("An open contribution already exists");
        }

        log.info("Creating contribution");
        Contribution contribution = Contribution
            .createContributionWithPenaltyPolicy(
                command.name(),
                command.description(),
                new DateRange(command.startDate(), command.endDate()),
                new Money(
                    command.contributionAmount()
                ),
                command.dueDate(),
                PenaltyType.FIXED.equals(command.penaltyType())
                    ? PenaltyPolicy.fixed(new Money(
                    command.penaltyAmount()
                )) :
                    PenaltyPolicy.percentage(new Money(
                        command.penaltyAmount()
                    ))

            );

        UUID contributionId = contributionRepository.save(contribution);
        log.info("Contribution created successfully,with contribution id: {}", contributionId);

        publisher.publishEvent(contribution);
        return contributionId;
    }



}
