package com.edir.app.contribution.application.ports.out.query;

import com.edir.app.contribution.domain.valueobjects.ContributionId;
import com.edir.app.contribution.domain.valueobjects.MemberContributionId;
import com.edir.app.shared.domain.entity.PageQuery;
import com.edir.app.shared.domain.entity.PageResult;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Component
public class MemberContributionQueryService {
    private final MemberContributionQueryRepository memberContributionQueryRepository;

    public PageResult<MemberContributionView> findMemberContribution(UUID contributionId, PageQuery pageQuery){
      return   memberContributionQueryRepository.findMembersContribution(
            new ContributionId(contributionId),
            pageQuery
        );
    }

    public Optional<MemberContributionView> findMemberContributionById(UUID id){
        return memberContributionQueryRepository.findByContribution(new MemberContributionId(id));
    }

    public List<PaymentView> findPayments(UUID id){
        return memberContributionQueryRepository.findAllPaymentByMemberContributionId(
            new MemberContributionId(id)
        );
    }

}
