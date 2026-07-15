package com.edir.app.contribution.domain.valueobjects;

import java.util.UUID;

public record PenaltyPolicyId(UUID value) {
    public PenaltyPolicyId {
        if (value == null) {
            throw new IllegalArgumentException("Id cannot be null");
        }
    }

    public static PenaltyPolicyId generateId() {
        return new PenaltyPolicyId(UUID.randomUUID());
    }
}
