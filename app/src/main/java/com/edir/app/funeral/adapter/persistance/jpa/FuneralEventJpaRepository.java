package com.edir.app.funeral.adapter.persistance.jpa;

import com.edir.app.funeral.adapter.persistance.FuneralEventEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface FuneralEventJpaRepository extends JpaRepository<FuneralEventEntity, UUID> {
}
