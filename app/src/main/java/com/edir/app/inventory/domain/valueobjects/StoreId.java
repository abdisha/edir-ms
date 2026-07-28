package com.edir.app.inventory.domain.valueobjects;

import com.edir.app.shared.domain.exceptions.DomainValidationException;

import java.util.UUID;

public record StoreId(UUID id) {
    public StoreId{
        if(id == null){
            throw new DomainValidationException("Store id cannot be null");
        }
    }

    public static StoreId generateId(){
        return new StoreId(UUID.randomUUID());
    }
}
