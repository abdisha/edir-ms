package com.edir.app.contribution.adapter.persistance.query;

import com.edir.app.contribution.adapter.persistance.jpa.JpaMemberContributionRepository;
import com.edir.app.contribution.application.ports.out.query.MemberContributionQueryRepository;
import com.edir.app.contribution.application.ports.out.query.MemberContributionView;
import com.edir.app.contribution.application.ports.out.query.PaymentView;
import com.edir.app.contribution.domain.valueobjects.ContributionId;
import com.edir.app.contribution.domain.valueobjects.MemberContributionId;
import com.edir.app.shared.domain.entity.PageQuery;
import com.edir.app.shared.domain.entity.PageResult;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Component
public class MemberContributionQueryRepositoryImpl implements MemberContributionQueryRepository {

    private final JpaMemberContributionRepository jpaMemberContributionRepository;

    @Override
    public PageResult<MemberContributionView> findMembersContribution(ContributionId contributionId, PageQuery pageQuery) {
        Page result = jpaMemberContributionRepository.findAllMemberContributionByContributionId(
            contributionId.value(),
            PageRequest.of(
                pageQuery.page(),
                pageQuery.size()
            )
        );
        return new PageResult<MemberContributionView>(
            result.getContent(),
            result.getNumber(),
            result.getSize(),
            result.getTotalElements(),
            result.getTotalPages()
        );
    }

    @Override
    public Optional<MemberContributionView> findByContribution(MemberContributionId id) {
        return jpaMemberContributionRepository
            .findAllMemberContributionByd(id.value());
    }

    @Override
    public List<PaymentView> findAllPaymentByMemberContributionId(MemberContributionId id) {
        return jpaMemberContributionRepository
            .findAllPaymentsByMemberContributionId(id.value());
    }


}
