package com.edir.app.funeral.application.port.out;

import com.edir.app.funeral.domain.entity.FuneralEvent;
import com.edir.app.funeral.domain.valueobjects.FuneralId;

import java.util.Optional;
import java.util.UUID;

public interface FuneralEventRepository {

    UUID save(FuneralEvent funeralEvent);

    Optional<FuneralEvent> findById(FuneralId funeralEventId);

}
