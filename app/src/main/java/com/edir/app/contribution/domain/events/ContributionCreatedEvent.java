package com.edir.app.contribution.domain.events;

import com.edir.app.shared.domain.event.DomainEvent;

import java.math.BigDecimal;
import java.util.UUID;

public record ContributionCreatedEvent(UUID contributionId,
                                       BigDecimal amount,
                                       String name) implements DomainEvent {


}
