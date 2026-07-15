package com.edir.app.contribution.domain.entity;

import com.edir.app.contribution.domain.valueobjects.ContributionId;
import com.edir.app.contribution.domain.valueobjects.MemberContributionId;
import com.edir.app.shared.domain.entity.AggregateRoot;
import com.edir.app.shared.domain.valueobjects.MemberId;
import com.edir.app.shared.domain.valueobjects.Money;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class MemberContribution  extends AggregateRoot<MemberContributionId> {
    private MemberId memberId;
    private ContributionId contributionId;
    private Money amount;
    private Money exceptedAmount;
    private Money currentPenalty;
    private Money rolledOverPenalty;
    private final Set<Payment> payments = new HashSet<>();

    private MemberContribution(MemberContributionId memberContributionId,
                               MemberId memberId,
                               ContributionId contributionId,
                               Money amount,
                               Money exceptedAmount,
                               Money currentPenalty,
                               Money rolledOverPenalty) {
        super(Objects.requireNonNull(memberContributionId, "MemberContributionId cannot be null"));
        this.memberId = Objects.requireNonNull(memberId, "MemberId cannot be null");
        this.contributionId = Objects.requireNonNull(contributionId, "ContributionId cannot be null");
        this.amount = Objects.requireNonNull(amount, "Amount cannot be null");
        this.exceptedAmount = Objects.requireNonNull(exceptedAmount, "Excepted amount cannot be null");
        this.currentPenalty = currentPenalty;
        this.rolledOverPenalty = rolledOverPenalty;
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
                currentPenalty,
                rolledOverPenalty
        );
    }

    public static MemberContribution rehydrate(MemberContributionId memberContributionId,
                                               MemberId memberId,
                                               ContributionId contributionId,
                                               Money amount,
                                               Money exceptedAmount,
                                               Money currentPenalty,
                                               Money rolledOverPenalty) {
        return new MemberContribution(
                memberContributionId,
                memberId,
                contributionId,
                amount,
                exceptedAmount,
                currentPenalty,
                rolledOverPenalty
        );
    }
}
