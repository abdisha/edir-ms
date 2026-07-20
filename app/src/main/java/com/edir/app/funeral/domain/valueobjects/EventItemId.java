package com.edir.app.funeral.domain.valueobjects;

import java.util.UUID;

public record EventItemId(UUID id) {
    public EventItemId {
        if (id == null) {
            throw new IllegalArgumentException("EventItemId cannot be null");
        }
        if (id.toString().isBlank()) {
            throw new IllegalArgumentException("EventItemId cannot be blank");
        }
    }
    public static EventItemId generate(){
        return new EventItemId(UUID.randomUUID());
    }
}
