package com.edir.app.edir.domain.valueobjects;

import java.util.UUID;

public record FulfillmentId(UUID value) {
    public FulfillmentId {
        if (value == null) {
            throw new IllegalArgumentException("FulFillmentId cannot be null");
        }
    }

    public static FulfillmentId generateId() {
        return new FulfillmentId(UUID.randomUUID());
    }
}
