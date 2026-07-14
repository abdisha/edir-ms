package com.edir.app.contribution.domain;

import com.edir.app.contribution.domain.entity.Contribution;
import com.edir.app.contribution.domain.entity.MemberContribution;
import com.edir.app.shared.domain.valueobjects.Money;

import java.time.ZonedDateTime;

public interface ContributionDomainService {

    void close(Contribution contribution,
               MemberContribution memberContribution,
               ZonedDateTime closingDate
    );

     Money calculate(
        Contribution contribution,
        MemberContribution memberContribution,
        ZonedDateTime closingDate
    ) ;


}
