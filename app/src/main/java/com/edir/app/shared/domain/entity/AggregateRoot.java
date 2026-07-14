package com.edir.app.shared.domain.entity;

import com.edir.app.shared.domain.event.DomainEvent;

import java.util.ArrayList;
import java.util.List;

public abstract class AggregateRoot<ID> extends BaseEntity<ID>{

    protected AggregateRoot(ID id) {
        super(id);
    }
    private final List<DomainEvent> domainEvents = new ArrayList<>();

    protected void registerEvent(DomainEvent event) {
        domainEvents.add(event);
    }

    public List<DomainEvent> domainEvents() {
        return List.copyOf(domainEvents);
    }

    public void clearEvents() {
        domainEvents.clear();
    }

}
