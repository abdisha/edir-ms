package com.edir.app.contribution.domain.valueobjects;

import java.util.UUID;

public record ContributionId(UUID value) {
    public static ContributionId generateId() {
        return new ContributionId(UUID.randomUUID());
    }


}
