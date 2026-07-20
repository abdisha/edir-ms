package com.edir.app.contribution.adapter.persistance.query;

import com.edir.app.contribution.adapter.persistance.jpa.JpaContributionRepository;
import com.edir.app.contribution.application.ports.out.query.ContributionQueryRepository;
import com.edir.app.contribution.application.ports.out.query.ContributionView;
import com.edir.app.shared.domain.entity.PageQuery;
import com.edir.app.shared.domain.entity.PageResult;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.util.Optional;

@AllArgsConstructor
@Component
public class ContributionQueryRepositoryImpl implements ContributionQueryRepository {
     private final JpaContributionRepository contributionRepository;

    @Override
    public Optional<ContributionView> findOpenContribution() {
        return contributionRepository.findActiveContribution();
    }

    @Override
    public PageResult<ContributionView> findContributions(PageQuery pageQuery) {
        Page<ContributionView> result = contributionRepository.findAllContributions(
            PageRequest.of(pageQuery.page(),pageQuery.size())
        );

        return new PageResult<ContributionView>(
            result.getContent(),
            result.getNumber(),
            result.getSize(),
            result.getTotalElements(),
            result.getTotalPages()
        );
    }
}
