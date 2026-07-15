package com.edir.app.contribution.domain.valueobjects;

import java.util.UUID;

public record PaymentId(UUID value) {
    public PaymentId {
        if (value == null) {
            throw new IllegalArgumentException("FulFillmentId cannot be null");
        }
    }

    public static PaymentId generateId() {
        return new PaymentId(UUID.randomUUID());
    }
}
