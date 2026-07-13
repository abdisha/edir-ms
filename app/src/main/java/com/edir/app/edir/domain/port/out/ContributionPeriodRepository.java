package com.edir.app.edir.domain.port.out;

import java.util.Optional;

public interface ContributionPeriodRepository {
    Optional<ContributionPeriod> findById(ContributionPeriodId contributionPeriodId);
    ContributionPeriod save(ContributionPeriod contributionPeriod);
}
