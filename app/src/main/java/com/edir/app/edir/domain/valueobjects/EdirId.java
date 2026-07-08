package com.edir.app.edir.domain.valueobjects;

import java.util.Objects;
import java.util.UUID;

public record EdirId(UUID value) {
    public EdirId{
        Objects.requireNonNull(value,"EdirId cannot be null!.");
    }
    public static EdirId generateId(){
        return new EdirId(UUID.randomUUID());
    }
}
