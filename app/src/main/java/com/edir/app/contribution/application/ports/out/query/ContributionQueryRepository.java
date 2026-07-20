package com.edir.app.contribution.application.ports.out.query;

import com.edir.app.shared.domain.entity.PageQuery;
import com.edir.app.shared.domain.entity.PageResult;

import java.util.Optional;

public interface ContributionQueryRepository {
    Optional<ContributionView> findOpenContribution();
    PageResult<ContributionView> findContributions(PageQuery pageQuery);
}
