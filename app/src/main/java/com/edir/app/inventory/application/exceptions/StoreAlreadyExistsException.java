package com.edir.app.inventory.application.exceptions;

import com.edir.app.shared.ApplicationException;
import jakarta.validation.constraints.NotNull;

public class StoreAlreadyExistsException extends ApplicationException {
    public StoreAlreadyExistsException(@NotNull String name) {
        super(String.format("Store with name %s already exists", name));
    }
}
