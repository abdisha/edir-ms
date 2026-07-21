package com.edir.app.contribution.domain;

import com.edir.app.contribution.domain.entity.MemberContribution;
import com.edir.app.contribution.domain.entity.Payment;
import com.edir.app.contribution.domain.valueobjects.ContributionId;
import com.edir.app.shared.domain.valueobjects.FullName;
import com.edir.app.shared.domain.valueobjects.MemberId;
import com.edir.app.shared.domain.valueobjects.Money;
import org.jspecify.annotations.NonNull;

import java.util.Optional;

public interface MemberContributionService {
     MemberContribution initialize(
        ContributionId contributionId,
        Money amount,
        MemberId memberId,
        FullName fullName,
        @NonNull Optional<MemberContribution> previousContribution
    );

    void receivePayment(MemberContribution ledger, Payment payment);
}
