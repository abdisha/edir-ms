package com.edir.app.edir.adapter.persistance.jpa;

import com.edir.app.edir.adapter.persistance.entity.EdirEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface EdirJpaRepository extends JpaRepository<EdirEntity, UUID> {
    Optional<EdirEntity> findById(String uuid);
}
