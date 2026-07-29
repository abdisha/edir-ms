package com.edir.app.contribution.application.ports.out;

import com.edir.app.contribution.domain.entity.Contribution;
import com.edir.app.contribution.domain.valueobjects.ContributionId;

import java.util.Optional;
import java.util.UUID;

public interface ContributionRepository {
    ContributionId save(Contribution contribution);
    Optional<Contribution> findById(UUID id);
    Optional<Contribution> findOpenContribution();
}
