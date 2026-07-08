package com.edir.app.edir.domain.exceptions;

import com.edir.app.shared.domain.exceptions.DomainException;

public class AlreadyPaidException extends DomainException {
    public AlreadyPaidException(String message) {
        super(message);
    }
}
