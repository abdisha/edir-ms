package com.edir.app.contribution.adapter;

import com.edir.app.contribution.adapter.persistance.entity.ContributionEntity;
import com.edir.app.contribution.adapter.persistance.entity.MemberContributionEntity;
import com.edir.app.contribution.adapter.persistance.entity.PaymentEntity;
import com.edir.app.contribution.domain.entity.Contribution;
import com.edir.app.contribution.domain.entity.MemberContribution;
import com.edir.app.contribution.domain.entity.Payment;
import com.edir.app.contribution.domain.valueobjects.*;
import com.edir.app.shared.domain.valueobjects.FullName;
import com.edir.app.shared.domain.valueobjects.MemberId;
import com.edir.app.shared.domain.valueobjects.Money;
import org.jspecify.annotations.NonNull;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ContributionDataMapper {
    public Contribution contributionEntityToContribution(ContributionEntity contributionEntity) {
        return Contribution.rehydrate(
            new ContributionId(contributionEntity.getId()),
            contributionEntity.getName(),
            contributionEntity.getDescription(),
            new DateRange(contributionEntity.getStartDate(),
                contributionEntity.getEndDate()),
            new Money(contributionEntity.getContributionAmount()),
            contributionEntity.getDueDate(),
            contributionEntity.getStatus(),
            new PenaltyPolicy(
                new Money(contributionEntity.getPenaltyAmount()),
                contributionEntity.getPenaltyType()
            )
        );
    }

    public ContributionEntity contributionToContributionEntity(Contribution contribution) {
        return ContributionEntity.builder()
            .id(contribution.getId().value())
            .name(contribution.getName())
            .description(contribution.getDescription())
            .startDate(contribution.getPeriodStartDate())
            .endDate(contribution.getPeriodEndDate())
            .dueDate(contribution.getDueDate())
            .contributionAmount(contribution.getContributionAmount().amount())
            .penaltyAmount(contribution.getPenaltyPolicy().amount().amount())
            .penaltyType(contribution.getPenaltyPolicy().penaltyType())
            .status(contribution.getStatus())
            .build();
    }

    public MemberContributionEntity memberContributionToMemberContributionEntity(MemberContribution memberContribution) {
        return MemberContributionEntity.builder()
            .id(memberContribution.getId().value())
            .fullName(memberContribution.getFullName().toString())
            .memberId(memberContribution.getMemberId().value())
            .contributionId(memberContribution.getContributionId().value())
            .rolledOverContribution(memberContribution.getOutstandingContribution().amount())
            .rolledOverPenalty(memberContribution.getOutstandingPenalty().amount())
            .paymentEntities(
                toPaymentEntity(memberContribution)
            ).contributionAmount(memberContribution
                .getContribution().amount())
            .status(memberContribution.getStatus())
            .penaltyAmount(memberContribution.getPenalty().amount())
            .build();
    }

    public MemberContribution memberContributionToMemberContributionEntity(MemberContributionEntity memberContributionEntity) {
        String [] names=  memberContributionEntity.getFullName().split(" ");

        return MemberContribution.rehydrate(
            new MemberContributionId(memberContributionEntity.getId()),
                       new MemberId(memberContributionEntity.getMemberId()),
            new FullName(names[0],names[1],names[2]),
            new ContributionId(memberContributionEntity.getContributionId()),
            new Money(memberContributionEntity.getContributionAmount()),
            new Money(memberContributionEntity.getRolledOverContribution()),
            new Money(memberContributionEntity.getPenaltyAmount()),
            memberContributionEntity.getStatus(),
            new Money(memberContributionEntity.getRolledOverPenalty()),
            toPayment(memberContributionEntity.getPaymentEntities())

        );
    }

    private Set<Payment> toPayment(List<PaymentEntity> paymentEntities) {
        return paymentEntities
            .stream().map(
                paymentEntity -> Payment.rehydrate(
                    new PaymentId(paymentEntity.getId()),
                    new Money(paymentEntity.getAmount()),
                    paymentEntity.getPaidAt(),
                    new MemberId(paymentEntity.getReceipterId()),
                    paymentEntity.getReceiptNumber(),
                    paymentEntity.getNote()
                )).collect(Collectors.toSet());
    }

    private static @NonNull List<PaymentEntity> toPaymentEntity(MemberContribution memberContribution) {
        return memberContribution.getPayments()
            .stream().map(
                payment -> PaymentEntity.builder()
                    .id(payment.getId().value())
                    .amount(payment.amount().amount())
                    .paidAt(payment.paidAt())
                    .receipterId(payment.getReceipterId().value())
                    .receiptNumber(payment.getReceiptNumber())
                    .note(payment.getNote())
                    .build()
            ).toList();
    }
}
