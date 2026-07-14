package com.edir.app.contribution.domain;

import com.edir.app.contribution.domain.entity.MemberContribution;
import com.edir.app.contribution.domain.valueobjects.ContributionId;
import com.edir.app.shared.domain.valueobjects.MemberId;
import com.edir.app.shared.domain.valueobjects.Money;
import org.jspecify.annotations.NonNull;

import java.util.Optional;

public class MemberContributionInitializationService  implements  MemberContributionInitialization{

    public MemberContribution initialize(
        ContributionId contributionId,
        Money amount,
        MemberId memberId,
        @NonNull Optional<MemberContribution> previousContribution
    ) {

        Money rolledContribution = Money.zero();
        Money rolledPenalty = Money.zero();

        if (previousContribution.isPresent()) {

            MemberContribution previous = previousContribution.get();

            rolledContribution = previous.getOutstandingContribution();
            rolledPenalty = previous.getOutstandingPenalty();
        }

        return MemberContribution.open(
            memberId,
            contributionId,
            amount,
            rolledContribution,
            rolledPenalty
        );
    }
}
