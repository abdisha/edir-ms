package com.edir.app.edir.adapter.persistance.jpa;

import com.edir.app.edir.adapter.persistance.entity.EdirEntity;
import com.edir.app.edir.application.edir.query.EdirView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface EdirJpaRepository extends JpaRepository<EdirEntity, UUID> {
    Optional<EdirEntity> findById(String uuid);
    Optional<EdirEntity> findFirstBy();

    @Query("""
        SELECT new com.edir.app.edir.application.query.EdirView(
            e.id,
            e.name,
            e.description,
            e.city,
            e.subCity,
            e.worda,
            e.phoneNumber,
            COUNT(m)
        )
        FROM EdirEntity e
        LEFT JOIN e.members m
        GROUP BY
            e.id,
            e.name,
            e.description,
            e.city,
            e.subCity,
            e.worda,
            e.phoneNumber
        """)
    Optional<EdirView> findEdir();
}
