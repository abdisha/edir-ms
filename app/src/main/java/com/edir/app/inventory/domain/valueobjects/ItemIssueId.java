package com.edir.app.inventory.domain.valueobjects;

import java.util.UUID;

public record ItemIssueId(UUID id) {
    public ItemIssueId {
        if (id == null) {
            throw new IllegalArgumentException("Id cannot be null");
        }
    }

    public static ItemIssueId generateId() {
        return new ItemIssueId(UUID.randomUUID());
    }
}
