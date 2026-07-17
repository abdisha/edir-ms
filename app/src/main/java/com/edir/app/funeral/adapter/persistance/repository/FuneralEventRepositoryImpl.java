package com.edir.app.funeral.adapter.persistance.repository;

import com.edir.app.funeral.adapter.FuneralDataMapper;
import com.edir.app.funeral.adapter.persistance.jpa.FuneralEventJpaRepository;
import com.edir.app.funeral.application.port.out.FuneralEventRepository;
import com.edir.app.funeral.domain.entity.FuneralEvent;
import com.edir.app.funeral.domain.valueobjects.FuneralId;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Repository
public class FuneralEventRepositoryImpl implements FuneralEventRepository {
    private final FuneralEventJpaRepository funeralEventJpaRepository;
    private final FuneralDataMapper mapper;

    @Override
    public UUID save(FuneralEvent funeralEvent) {

        return funeralEventJpaRepository.save(
            mapper.funeralEventToFuneralEventEntity(funeralEvent)

        ).getFuneralEventId();
    }

    @Override
    public Optional<FuneralEvent> findById(FuneralId funeralEventId) {
        return funeralEventJpaRepository
            .findById(funeralEventId.id())
            .map(mapper::funeralEventEntityToDomain);
    }

}
