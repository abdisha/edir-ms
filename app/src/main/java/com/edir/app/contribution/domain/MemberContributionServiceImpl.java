package com.edir.app.contribution.domain;

import com.edir.app.contribution.domain.entity.MemberContribution;
import com.edir.app.contribution.domain.entity.Payment;
import com.edir.app.contribution.domain.valueobjects.ContributionId;
import com.edir.app.contribution.domain.valueobjects.Settlement;
import com.edir.app.shared.domain.valueobjects.FullName;
import com.edir.app.shared.domain.valueobjects.MemberId;
import com.edir.app.shared.domain.valueobjects.Money;
import org.jspecify.annotations.NonNull;

import java.util.Optional;

public class MemberContributionServiceImpl implements MemberContributionService {

    public MemberContribution initialize(
        ContributionId contributionId,
        Money amount,
        MemberId memberId,
        FullName fullName,
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

    public void receivePayment(MemberContribution ledger, Payment payment) {
        Settlement settlement = settle(ledger, payment.amount());
        ledger.receivePayment(payment, settlement);
    }

    private Settlement settle(MemberContribution ledger, Money payment) {

        Money remaining = payment;
        Money penaltyPaid = Money.zero();
        Money rolloverPaid = Money.zero();
        Money contributionPaid = Money.zero();

        if (remaining.isPositive()) {
            Money pay = ledger.getOutstandingPenalty().min(remaining);
            penaltyPaid = pay;
            remaining = remaining.subtract(pay);
        }

        if (remaining.isPositive()) {
            Money pay = ledger
                .getRolledOverContribution().min(remaining);
            rolloverPaid = pay;
            remaining = remaining.subtract(pay);
        }

        if (remaining.isPositive()) {
            Money pay = ledger.getOutstandingContribution()
                .min(remaining);
            contributionPaid = pay;
            remaining = remaining.subtract(pay);
        }

        return new Settlement(
            contributionPaid,
            penaltyPaid,
            rolloverPaid,
            remaining

        );

    }
}
