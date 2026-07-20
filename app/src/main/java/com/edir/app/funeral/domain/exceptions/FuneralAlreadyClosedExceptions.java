package com.edir.app.funeral.domain.exceptions;

import com.edir.app.funeral.domain.valueobjects.FuneralId;
import com.edir.app.shared.domain.exceptions.DomainException;

public class FuneralAlreadyClosedExceptions extends DomainException {
    public FuneralAlreadyClosedExceptions(FuneralId id) {

        super("Funeral event already closed with id: " + id.id() );
    }
}
