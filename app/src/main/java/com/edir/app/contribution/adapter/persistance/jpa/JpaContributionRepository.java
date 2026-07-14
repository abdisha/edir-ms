package com.edir.app.contribution.adapter.persistance.jpa;

import com.edir.app.contribution.domain.entity.Contribution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
@Repository
public interface JpaContributionRepository extends JpaRepository<Contribution, UUID> {
    Optional<Contribution> findContributionByIsClosedIsFalse();
}
