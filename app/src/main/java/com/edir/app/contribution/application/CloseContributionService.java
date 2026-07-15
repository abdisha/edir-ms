package com.edir.app.contribution.application;

import com.edir.app.contribution.application.exceptions.OpenContributionNotFoundException;
import com.edir.app.contribution.application.usecases.CloseContributionUseCase;
import com.edir.app.contribution.domain.ContributionDomainService;
import com.edir.app.contribution.domain.entity.Contribution;
import com.edir.app.contribution.domain.entity.MemberContribution;
import com.edir.app.contribution.domain.ports.ContributionRepository;
import com.edir.app.contribution.domain.ports.MemberContributionRepository;
import com.edir.app.shared.domain.event.DomainEventPublisher;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class CloseContributionService implements CloseContributionUseCase {
    private final ContributionRepository contributionRepository;
    private final MemberContributionRepository memberContributionRepository;
    private final DomainEventPublisher publisher;
    private final ContributionDomainService contributionDomainService;

    @Override
    public void execute() {
        Contribution contribution =
            contributionRepository.findOpenContribution()
                .orElseThrow(OpenContributionNotFoundException::new);

        List<MemberContribution> ledgers =
            memberContributionRepository.findByContributionId(
                contribution.getId()
            );

        for (MemberContribution ledger : ledgers) {
            contributionDomainService.close(
                contribution,
                ledger,
                ZonedDateTime.now()
            );
            memberContributionRepository.save(ledger);
        }

        contribution.closePeriod();

        contributionRepository.save(contribution);

        publisher.publishEvent(contribution);
    }
}
