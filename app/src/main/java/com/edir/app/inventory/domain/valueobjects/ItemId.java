package com.edir.app.inventory.domain.valueobjects;

import java.util.Objects;
import java.util.UUID;

public record ItemId(UUID id) {
    public ItemId {
        Objects.requireNonNull(id, "Item Id cannot be null");
    }


    public static ItemId generateId() {
        return new ItemId(UUID.randomUUID());
    }
}
