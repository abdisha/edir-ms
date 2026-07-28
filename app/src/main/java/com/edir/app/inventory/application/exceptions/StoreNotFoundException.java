package com.edir.app.inventory.application.exceptions;

import com.edir.app.inventory.domain.valueobjects.StoreId;
import com.edir.app.shared.ApplicationException;

public class StoreNotFoundException extends ApplicationException {
    public StoreNotFoundException(StoreId id) {
        super(String.format("Store with id %s not found", id));
    }
}
