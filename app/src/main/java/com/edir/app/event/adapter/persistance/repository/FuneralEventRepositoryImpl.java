package com.edir.app.event.adapter.persistance.repository;

import com.edir.app.event.adapter.EventDataMapper;
import com.edir.app.event.adapter.persistance.jpa.JpaFuneralEventRepository;
import com.edir.app.event.application.port.out.FuneralEventRepository;
import com.edir.app.event.application.port.out.query.FuneralEventQueryRepository;
import com.edir.app.event.application.port.out.query.FuneralEventView;
import com.edir.app.event.application.port.out.query.ItemIssueView;
import com.edir.app.event.domain.entity.FuneralEvent;
import com.edir.app.event.domain.valueobjects.FuneralEventId;
import com.edir.app.shared.adapter.PersistenceAdapter;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@PersistenceAdapter
class FuneralEventRepositoryImpl implements FuneralEventRepository, FuneralEventQueryRepository {
    private final JpaFuneralEventRepository jpaFuneralEventRepository;
    private final EventDataMapper mapper;

    @Override
    public UUID save(FuneralEvent edirEvent) {
        return jpaFuneralEventRepository
            .save(mapper.funeralEventToFuneralEventEntity(edirEvent))
            .getFuneralEventId();
    }

    @Override
    public Optional<FuneralEvent> findById(FuneralEventId funeralEventId) {
        return jpaFuneralEventRepository.findById(funeralEventId.id())
            .map(mapper::funeralEventEntityToDomain);
    }

    @Override
    public Optional<FuneralEventView> findById(UUID funeralId) {
        return Optional.empty();
    }

    @Override
    public List<FuneralEventView> findAll() {
        return List.of();
    }

    @Override
    public List<ItemIssueView> findByFuneralId(UUID funeralId) {
        return List.of();
    }
}
