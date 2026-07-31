package com.edir.app.event.domain.valueobjects;

import com.edir.app.shared.domain.exceptions.DomainValidationException;

import java.util.UUID;

public record FuneralEventId(UUID id) {
    public FuneralEventId {
        if (id == null) {
            throw new DomainValidationException("FuneralEventId cannot be null");
        }
    }

    public static FuneralEventId generate() {
        return new FuneralEventId(UUID.randomUUID());
    }
}
