package com.edir.app.contribution.domain;

import com.edir.app.contribution.domain.entity.Contribution;
import com.edir.app.contribution.domain.entity.MemberContribution;
import com.edir.app.shared.domain.valueobjects.Money;

import java.time.ZonedDateTime;

public class ContributionDomainServiceImpl implements ContributionDomainService {

    public void close(Contribution contribution,
        MemberContribution memberContribution,
        ZonedDateTime closingDate) {

        if (memberContribution.hasOutstandingContribution()) {
            var penalty = calculate(
                contribution,
                memberContribution,
                closingDate
            );

            memberContribution.applyPenalty(penalty);
        }
        memberContribution.close();

    }

    public Money calculate( Contribution contribution,
        MemberContribution memberContribution,
        ZonedDateTime closingDate) {

        if (!closingDate.isAfter(contribution.getDueDate())) {
            return Money.zero();
        }
        return contribution.getPenaltyPolicy().calculate(memberContribution
                .getOutstandingContribution());
    }


}
