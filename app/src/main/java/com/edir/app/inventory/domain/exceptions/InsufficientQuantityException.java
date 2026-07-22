package com.edir.app.inventory.domain.exceptions;

import com.edir.app.shared.domain.exceptions.DomainException;

import java.util.UUID;

public class InsufficientQuantityException extends DomainException {
    public InsufficientQuantityException(UUID itemId,int quantityOnHand,int quantity) {
        super("Insufficient Quantity quantity on hand is"+quantityOnHand+" where as requested:"+quantity +" for item id"+itemId);
    }
}
