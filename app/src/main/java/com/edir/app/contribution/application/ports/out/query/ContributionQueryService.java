package com.edir.app.contribution.application.ports.out.query;

import com.edir.app.shared.domain.entity.PageQuery;
import com.edir.app.shared.domain.entity.PageResult;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@AllArgsConstructor
@Component
public class ContributionQueryService {
    private final ContributionQueryRepository contributionQueryRepository;

    public PageResult<ContributionView> findAllContribution(PageQuery pageQuery){
        return contributionQueryRepository.findContributions(pageQuery);
    }

    public Optional<ContributionView> findOpenContribution(){
        return contributionQueryRepository.findOpenContribution();
    }

}
