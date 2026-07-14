package com.edir.app.contribution.domain;

import com.edir.app.contribution.domain.entity.Contribution;
import com.edir.app.contribution.domain.entity.MemberContribution;
import com.edir.app.shared.domain.valueobjects.MemberId;
import com.edir.app.shared.domain.valueobjects.Money;

public interface ContributionDomainService {
    void makePayment(Contribution contribution,
                     MemberContribution memberContribution,

                     Money amount,
                     String receiptNo,
                     MemberId memberId);


}
