package com.edir.app.inventory.domain.valueobjects;

import java.util.Objects;
import java.util.UUID;

public record AllocationId(UUID id) {
    public AllocationId {
        Objects.requireNonNull(id,"Allocation Id cannot be null");
    }

    public static AllocationId generateId(){
        return new AllocationId(UUID.randomUUID());
    }
}
