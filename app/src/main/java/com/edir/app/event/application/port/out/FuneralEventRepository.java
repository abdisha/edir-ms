package com.edir.app.event.application.port.out;

import com.edir.app.event.domain.entity.FuneralEvent;
import com.edir.app.event.domain.valueobjects.FuneralEventId;

import java.util.Optional;
import java.util.UUID;

public interface FuneralEventRepository {
    UUID save(FuneralEvent funeralEvent);
    Optional<FuneralEvent> findById(FuneralEventId funeralEventId);
}
