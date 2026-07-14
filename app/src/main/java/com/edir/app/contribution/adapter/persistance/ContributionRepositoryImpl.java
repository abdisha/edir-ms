package com.edir.app.contribution.adapter.persistance;

import com.edir.app.contribution.adapter.persistance.jpa.JpaContributionRepository;
import com.edir.app.contribution.domain.entity.Contribution;
import com.edir.app.contribution.domain.ports.ContributionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Repository
@SuppressWarnings("unused")
public class ContributionRepositoryImpl implements ContributionRepository {
    private final JpaContributionRepository jpaContributionRepository;
    @Override
    public UUID save(Contribution contribution) {
        return jpaContributionRepository.save(contribution).getId().value();
    }

    @Override
    public Optional<Contribution> find(UUID id) {
        return jpaContributionRepository.findById(id);
    }

    @Override
    public Optional<Contribution> findOpenContribution() {
        return jpaContributionRepository.findContributionByIsClosedIsFalse();
    }

}
