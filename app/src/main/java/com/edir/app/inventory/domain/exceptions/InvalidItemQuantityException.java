package com.edir.app.inventory.domain.exceptions;

import com.edir.app.shared.domain.exceptions.DomainException;

public class InvalidItemQuantityException extends DomainException {
    public InvalidItemQuantityException(String message) {
        super(message);
    }
}
