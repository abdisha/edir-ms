package com.edir.app.event.application.port.out.query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FuneralEventQueryRepository {
    Optional<FuneralEventView> findById(UUID funeralId);
    List<FuneralEventView> findAll();

    List<ItemIssueView> findByFuneralId(UUID funeralId);
}
