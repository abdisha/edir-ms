package com.edir.app.contribution.application.ports.out;

import com.edir.app.contribution.domain.entity.Contribution;

import java.util.Optional;
import java.util.UUID;

public interface ContributionRepository {
    UUID save(Contribution contribution);
    Optional<Contribution> findById(UUID id);
    Optional<Contribution> findOpenContribution();
}
