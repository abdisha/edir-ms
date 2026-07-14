package com.edir.app.contribution.domain.entity;

import com.edir.app.contribution.domain.valueobjects.ContributionId;
import com.edir.app.contribution.domain.valueobjects.MemberContributionId;
import com.edir.app.contribution.domain.valueobjects.MemberContributionStatus;
import com.edir.app.contribution.domain.valueobjects.Settlement;
import com.edir.app.shared.domain.entity.AggregateRoot;
import com.edir.app.shared.domain.valueobjects.MemberId;
import com.edir.app.shared.domain.valueobjects.Money;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class MemberContribution  extends AggregateRoot<MemberContributionId> {
    private MemberId memberId;
    private ContributionId contributionId;
    private Money outstandingContribution;
    private Money contribution;
    private Money penalty;
    private Money outstandingPenalty;
    private MemberContributionStatus status;
    private final Set<Payment> payments = new HashSet<>();

    private MemberContribution(MemberContributionId memberContributionId,
                               MemberId memberId,
                               ContributionId contributionId,
                               Money outstandingContribution,
                               Money contribution,
                               Money outstandingPenalty) {
        super(Objects.requireNonNull(memberContributionId, "MemberContributionId cannot be null"));
        this.memberId = Objects.requireNonNull(memberId, "MemberId cannot be null");
        this.contributionId = Objects.requireNonNull(contributionId, "ContributionId cannot be null");
        this.outstandingContribution = Objects.requireNonNull(outstandingContribution, "Amount cannot be null");
        this.contribution = Objects.requireNonNull(contribution, "Excepted amount cannot be null");
        this.outstandingPenalty = outstandingPenalty;
    }

    private MemberContribution(MemberContributionId memberContributionId,
                               MemberId memberId,
                               ContributionId contributionId,
                               Money outstandingContribution,
                               Money contribution,
                               Money penalty,
                               Money outstandingPenalty,
                               Set<Payment> payments) {
        super(Objects.requireNonNull(memberContributionId, "MemberContributionId cannot be null"));
        this.memberId = Objects.requireNonNull(memberId, "MemberId cannot be null");
        this.contributionId = Objects.requireNonNull(contributionId, "ContributionId cannot be null");
        this.outstandingContribution = Objects.requireNonNull(outstandingContribution, "Amount cannot be null");
        this.contribution = Objects.requireNonNull(contribution, "Excepted amount cannot be null");
        this.penalty = penalty;
        this.outstandingPenalty = outstandingPenalty;
        this.payments.addAll(payments);
    }

    public static MemberContribution open(MemberId memberId,
                                              ContributionId contributionId,
                                              Money rolledOverContribution,
                                              Money contribution,
                                              Money rolledOverPenalty) {
        return new MemberContribution(
            MemberContributionId.generateId(),
            memberId,
            contributionId,
            rolledOverContribution,
            contribution,
            rolledOverPenalty
        );
    }
    public static MemberContribution createMemberContribution(MemberId memberId,
                                                              ContributionId contributionId,
                                                              Money amount,
                                                              Money exceptedAmount,
                                                              Money currentPenalty,
                                                              Money rolledOverPenalty) {
        return new MemberContribution(
                MemberContributionId.generateId(),
                memberId,
                contributionId,
                amount,
                exceptedAmount,
                rolledOverPenalty
        );
    }

    public static MemberContribution rehydrate(MemberContributionId memberContributionId,
                                               MemberId memberId,
                                               ContributionId contributionId,
                                               Money amount,
                                               Money exceptedAmount,
                                               Money currentPenalty,
                                               Money rolledOverPenalty,
                                               Set<Payment> payments) {
        return new MemberContribution(
                memberContributionId,
                memberId,
                contributionId,
                amount,
                exceptedAmount,
                currentPenalty,
                rolledOverPenalty,
                payments
        );
    }



    public void receivePayment(Payment payment, Settlement settlement){
        payments.add(payment);

        outstandingPenalty = outstandingPenalty
            .subtract(settlement.penaltyPaid());

        outstandingContribution = outstandingContribution
            .subtract(settlement.rolledContributionPaid());

        outstandingContribution = outstandingContribution
            .subtract(settlement.currentContributionPaid());
    }

    public void applyPenalty(Money penalty) {
        if (penalty.isZero()) {
            return;
        }

        this.outstandingPenalty =
            this.outstandingPenalty.add(penalty);
    }
    public void close() {
        status = MemberContributionStatus.CLOSED;
    }

    public Money getOutstandingPenalty() {
        return outstandingPenalty;
    }

    public Set<Payment> getPayments(){
        return Set.copyOf(payments);
    }
    public Money getOutstandingContribution(){
        return outstandingContribution;
    }
    public boolean hasOutstandingContribution() {
        return !outstandingContribution.isZero();
    }


    public Money getRolledOverContribution() {
        return outstandingContribution;
    }
}
