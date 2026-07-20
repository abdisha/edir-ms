package com.edir.app.contribution.application.services;

import com.edir.app.contribution.application.ports.in.commands.ReceivePaymentCommand;
import com.edir.app.contribution.application.exceptions.MemberContributionNotFoundException;
import com.edir.app.contribution.application.ports.in.usecases.ReceivePaymentUseCase;
import com.edir.app.contribution.domain.MemberContributionService;
import com.edir.app.contribution.domain.entity.MemberContribution;
import com.edir.app.contribution.domain.entity.Payment;
import com.edir.app.contribution.application.ports.out.MemberContributionRepository;
import com.edir.app.contribution.domain.valueobjects.MemberContributionId;
import com.edir.app.shared.domain.valueobjects.MemberId;
import com.edir.app.shared.domain.valueobjects.Money;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@AllArgsConstructor
@Service
public class ReceivePaymentService implements ReceivePaymentUseCase {
    private final MemberContributionRepository memberRepository;
    private final MemberContributionService memberContributionService;

    @Override
    public void execute(ReceivePaymentCommand command) {
        MemberContribution ledger = memberRepository
            .findByMemberId(new MemberContributionId(command.memberId()))
            .orElseThrow(
                ()-> new MemberContributionNotFoundException(command.memberId())
            );

        Payment payment = Payment
            .receive(Money.of(command.amount()),
                    command.paymentDate(),
                    new MemberId(command.receipterId()),
                    command.receiptNumber(),
                    command.remark()
            );

        memberContributionService.receivePayment(
            ledger,
            payment
        );

        memberRepository.save(ledger);
    }
}
