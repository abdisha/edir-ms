package com.edir.app.shared.domain.exceptions;

public class DomainValidationException extends DomainException{
    public DomainValidationException(String message) {
        super(message);
    }
}
