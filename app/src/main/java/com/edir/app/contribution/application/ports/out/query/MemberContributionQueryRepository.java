package com.edir.app.contribution.application.ports.out.query;

import com.edir.app.contribution.domain.valueobjects.ContributionId;
import com.edir.app.contribution.domain.valueobjects.MemberContributionId;
import com.edir.app.shared.domain.entity.PageQuery;
import com.edir.app.shared.domain.entity.PageResult;

import java.util.List;
import java.util.Optional;

public interface MemberContributionQueryRepository {
    PageResult<MemberContributionView> findMembersContribution(ContributionId contributionId, PageQuery pageQuery);

    Optional<MemberContributionView> findByContribution(MemberContributionId id);

    List<PaymentView> findAllPaymentByMemberContributionId(MemberContributionId id);
}
