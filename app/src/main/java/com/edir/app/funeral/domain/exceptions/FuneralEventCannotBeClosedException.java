package com.edir.app.funeral.domain.exceptions;

import com.edir.app.shared.domain.exceptions.DomainException;

public class FuneralEventCannotBeClosedException extends DomainException {
    public FuneralEventCannotBeClosedException(String message) {
        super(message);
    }
}
