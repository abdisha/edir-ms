package com.edir.app.event.domain.valueobjects;

import com.edir.app.shared.domain.exceptions.DomainValidationException;

import java.util.UUID;

public record MeetingEventId(UUID id) {
    public MeetingEventId {
        if (id == null) {
            throw new DomainValidationException("MeetingEventId cannot be null");
        }
    }

    public static MeetingEventId generate() {
        return new MeetingEventId(UUID.randomUUID());
    }
}
