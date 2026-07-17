package com.edir.app.funeral.application.exceptions;

import com.edir.app.funeral.domain.valueobjects.FuneralId;

public class FuneralEventNotFoundExceptions extends RuntimeException {
    public FuneralEventNotFoundExceptions(FuneralId id) {
        super("Funeral event not found by id: " + id.id());
    }
}
