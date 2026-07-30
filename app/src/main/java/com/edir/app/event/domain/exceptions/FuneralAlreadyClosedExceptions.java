package com.edir.app.event.domain.exceptions;

import com.edir.app.event.domain.valueobjects.FuneralEventId;
import com.edir.app.shared.domain.exceptions.DomainException;

public class FuneralAlreadyClosedExceptions extends DomainException {
    public FuneralAlreadyClosedExceptions(FuneralEventId id) {

        super("Funeral event already closed with id: " + id.id() );
    }
}
