package com.edir.app.edir.domain.port.out;

import com.edir.app.edir.domain.entity.ContributionPeriod;
import com.edir.app.edir.domain.valueobjects.ContributionPeriodId;

import java.util.Optional;

public interface ContributionPeriodRepository {
    Optional<ContributionPeriod> findById(ContributionPeriodId contributionPeriodId);
    ContributionPeriod save(ContributionPeriod contributionPeriod);
}
