package com.edir.app.event.domain.events;


import com.edir.app.shared.domain.event.DomainEvent;
import com.edir.app.shared.domain.valueobjects.ItemCode;

import java.time.ZonedDateTime;

public record ItemIssueAddedEvent(ItemCode itemCode, Integer quantity, ZonedDateTime issuedDate) implements DomainEvent {

}
