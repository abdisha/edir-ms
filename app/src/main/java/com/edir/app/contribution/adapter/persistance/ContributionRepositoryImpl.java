package com.edir.app.contribution.adapter.persistance;

import com.edir.app.contribution.adapter.ContributionDataMapper;
import com.edir.app.contribution.adapter.persistance.jpa.JpaContributionRepository;
import com.edir.app.contribution.application.ports.out.ContributionRepository;
import com.edir.app.contribution.domain.entity.Contribution;
import com.edir.app.contribution.domain.valueobjects.ContributionId;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Repository
@SuppressWarnings("unused")
public class ContributionRepositoryImpl implements ContributionRepository {
    private final JpaContributionRepository jpaContributionRepository;
    private final ContributionDataMapper mapper;

    @Override
    public ContributionId save(Contribution contribution) {
        var entity =  jpaContributionRepository
            .save(mapper.contributionToContributionEntity(contribution));
        return new ContributionId(entity.getId());
    }

    @Override
    public Optional<Contribution> findById(UUID id) {
        return jpaContributionRepository
            .findById(id)
            .map(mapper::contributionEntityToContribution);
    }

    @Override
    public Optional<Contribution> findOpenContribution() {
        return jpaContributionRepository
            .findContributionEntityByOpenStatus()
            .map(mapper::contributionEntityToContribution);
    }

}
