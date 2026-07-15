package com.edir.app.contribution.adapter.persistance.jpa;

import com.edir.app.contribution.adapter.persistance.entity.ContributionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
@Repository
public interface JpaContributionRepository extends JpaRepository<ContributionEntity, UUID> {
    @Query(
        value = """
                select c from ContributionEntity c where c.status = 'OPEN'
            """
    )
    Optional<ContributionEntity> findContributionEntityByOpenStatus();
}
