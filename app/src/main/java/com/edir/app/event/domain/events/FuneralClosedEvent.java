package com.edir.app.event.domain.events;

import com.edir.app.event.domain.valueobjects.FuneralEventId;
import com.edir.app.shared.domain.event.DomainEvent;

import java.time.ZonedDateTime;

public record FuneralClosedEvent(FuneralEventId id, ZonedDateTime now) implements DomainEvent {
}
