package com.edir.app.contribution.domain.valueobjects;

import java.util.UUID;

public record MemberContributionId(UUID value) {
    public MemberContributionId {
        if (value == null) {
            throw new IllegalArgumentException("Id cannot be null");
        }
    }

    public static MemberContributionId generateId() {
        return new MemberContributionId(UUID.randomUUID());
    }
}
