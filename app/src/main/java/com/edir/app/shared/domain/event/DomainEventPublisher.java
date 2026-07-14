package com.edir.app.shared.domain.event;

import com.edir.app.shared.domain.entity.AggregateRoot;
import lombok.AllArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class DomainEventPublisher {

    private final ApplicationEventPublisher publisher;

    public void publishEvent(AggregateRoot<?> aggregate) {

        aggregate.domainEvents()
            .forEach(publisher::publishEvent);

        aggregate.clearEvents();
    }
}
