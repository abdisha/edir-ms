package com.edir.app.contribution.domain.events;

import com.edir.app.contribution.domain.valueobjects.ContributionId;
import com.edir.app.shared.domain.event.DomainEvent;

public record ContributionClosedEvent(ContributionId contributionId) implements DomainEvent {

}
