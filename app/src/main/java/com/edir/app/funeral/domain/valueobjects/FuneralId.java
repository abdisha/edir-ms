package com.edir.app.funeral.domain.valueobjects;

import java.util.UUID;

public record FuneralId(UUID id) {
    public FuneralId {
        if (id == null) {
            throw new IllegalArgumentException("FuneralId cannot be null");
        }
        if (id.toString().isBlank()) {
            throw new IllegalArgumentException("FuneralId cannot be blank");
        }
    }

    public static FuneralId generate() {
            return new FuneralId(UUID.randomUUID());
    }
}
