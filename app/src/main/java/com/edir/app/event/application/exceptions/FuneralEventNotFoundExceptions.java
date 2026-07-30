package com.edir.app.event.application.exceptions;

import com.edir.app.event.domain.valueobjects.FuneralEventId;
import com.edir.app.shared.ApplicationException;

public class FuneralEventNotFoundExceptions extends ApplicationException {
    public FuneralEventNotFoundExceptions(FuneralEventId id) {
        super("Funeral event not found by id: " + id.id());
    }
}
