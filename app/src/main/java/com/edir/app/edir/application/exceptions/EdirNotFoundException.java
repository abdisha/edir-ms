package com.edir.app.edir.application.exceptions;

import com.edir.app.shared.domain.exceptions.DomainException;

public class EdirNotFoundException extends DomainException {
    public EdirNotFoundException(String message) {
        super(message);
    }
}
