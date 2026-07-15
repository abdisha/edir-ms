package com.edir.app.contribution.domain.exceptions;

import com.edir.app.shared.domain.exceptions.DomainException;

public class InvalidDateRangeException extends DomainException {
    public InvalidDateRangeException(String message) {
        super(message);
    }
}
