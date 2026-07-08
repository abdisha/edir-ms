package com.edir.app.edir.domain.valueobjects;

import java.util.UUID;

public record ContributionPeriodId(UUID value) {
    public ContributionPeriodId {
        if (value == null) {
            throw new IllegalArgumentException("ContributionPeriodId cannot be null");
        }
    }

    public static ContributionPeriodId generateId() {
        return new ContributionPeriodId(UUID.randomUUID());
    }
}
