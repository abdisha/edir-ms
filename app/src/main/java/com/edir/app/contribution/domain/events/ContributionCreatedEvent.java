package com.edir.app.contribution.domain.events;

import com.edir.app.contribution.domain.valueobjects.ContributionId;
import com.edir.app.shared.domain.event.DomainEvent;
import com.edir.app.shared.domain.valueobjects.Money;

public record ContributionCreatedEvent(ContributionId contributionId,
                                       Money amount,
                                       String name) implements DomainEvent {

}
