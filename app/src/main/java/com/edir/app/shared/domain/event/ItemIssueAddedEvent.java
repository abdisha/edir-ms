package com.edir.app.shared.domain.event;


import com.edir.app.shared.domain.valueobjects.ItemCode;
import com.edir.app.shared.domain.valueobjects.MemberId;

import java.time.ZonedDateTime;
import java.util.UUID;

public record ItemIssueAddedEvent(UUID funeralEventId,
                                  ItemCode itemCode,
                                  Integer quantity,
                                  MemberId requestedFor,
                                  ZonedDateTime issuedDate) implements DomainEvent {

}
