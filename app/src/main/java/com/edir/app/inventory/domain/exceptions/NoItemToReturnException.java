package com.edir.app.inventory.domain.exceptions;

import com.edir.app.inventory.domain.valueobjects.ItemId;
import com.edir.app.shared.domain.exceptions.DomainException;

import java.util.UUID;

public class NoItemToReturnException extends DomainException {

    public NoItemToReturnException(ItemId itemId) {
        super("There is no item to return for this item "+itemId);
    }
}
