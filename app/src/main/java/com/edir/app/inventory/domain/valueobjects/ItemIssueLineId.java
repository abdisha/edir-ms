package com.edir.app.inventory.domain.valueobjects;

import java.util.UUID;

public record ItemIssueLineId (UUID id){
    public ItemIssueLineId {
        if (id == null) {
            throw new IllegalArgumentException("Id cannot be null");
        }
    }

    public static ItemIssueLineId generateId() {
        return new ItemIssueLineId(UUID.randomUUID());
    }
}
