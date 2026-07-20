package com.edir.app.edir.domain.api.events;

import com.edir.app.shared.domain.event.DomainEvent;
import com.edir.app.shared.domain.valueobjects.FullName;
import com.edir.app.shared.domain.valueobjects.MemberId;
import org.springframework.modulith.NamedInterface;

import java.time.ZonedDateTime;

@NamedInterface
public record MemberJoinedEvent(MemberId id, FullName fullName, ZonedDateTime joinedAt) implements DomainEvent {
}
