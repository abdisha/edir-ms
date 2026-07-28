package com.edir.app.inventory.domain.exceptions;

import com.edir.app.shared.domain.exceptions.DomainException;

public class ItemCannotBeInActiveException extends DomainException {
    public ItemCannotBeInActiveException(String message) {
        super(message);
    }
}
