package com.edir.app.inventory.application.exceptions;

import com.edir.app.shared.ApplicationException;

public class ItemNotFoundException extends ApplicationException {
    public ItemNotFoundException(String message){
        super(message);
    }
}
