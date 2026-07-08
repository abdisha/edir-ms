package com.edir.app.edir.domain.exceptions;

import com.edir.app.shared.domain.exceptions.DomainException;

public class InsufficientPaymentException extends DomainException {
    public InsufficientPaymentException(String message) {
        super(message);
    }
}
