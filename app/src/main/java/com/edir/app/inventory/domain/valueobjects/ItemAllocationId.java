package com.edir.app.inventory.domain.valueobjects;

import com.edir.app.inventory.domain.entity.ItemAllocation;

import java.util.Objects;
import java.util.UUID;

public record ItemAllocationId(UUID id) {
    public ItemAllocationId{
        Objects.requireNonNull(id,"Item allocation Id cannot be null");
    }

    public static ItemAllocationId generateId(){
        return new ItemAllocationId(UUID.randomUUID());
    }
}
