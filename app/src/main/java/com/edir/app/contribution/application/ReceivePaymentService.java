package com.edir.app.contribution.application;

import com.edir.app.contribution.application.commands.ReceivePaymentCommand;
import com.edir.app.contribution.application.exceptions.OpenContributionNotFoundException;
import com.edir.app.contribution.application.usecases.ReceivePaymentUseCase;
import com.edir.app.contribution.domain.ContributionDomainServiceImpl;
import com.edir.app.contribution.domain.entity.Contribution;
import com.edir.app.contribution.domain.entity.MemberContribution;
import com.edir.app.contribution.domain.ports.ContributionRepository;
import com.edir.app.contribution.domain.ports.MemberContributionRepository;
import com.edir.app.shared.domain.valueobjects.MemberId;
import com.edir.app.shared.domain.valueobjects.Money;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@AllArgsConstructor
@Service
public class ReceivePaymentService implements ReceivePaymentUseCase {
    private final ContributionRepository contributionRepository;
    private final MemberContributionRepository memberContributionRepository;
    private final ContributionDomainServiceImpl contributionDomainServiceImpl;

    @Override
    public void execute(ReceivePaymentCommand receivePaymentCommand) {
        Contribution contribution = contributionRepository.findOpenContribution()
                .orElseThrow(() ->
                        new OpenContributionNotFoundException("No open contribution found"));

        MemberContribution memberContribution = memberContributionRepository
                .findByContributionIdAndMemberId(
                        contribution.getId(),
                        new MemberId(receivePaymentCommand.memberId()));

        contributionDomainServiceImpl.makePayment(
                contribution,
                memberContribution,
                new Money(receivePaymentCommand.amount()),
                receivePaymentCommand.receiptNumber(),
                new MemberId(receivePaymentCommand.memberId())
        );

    }
}
