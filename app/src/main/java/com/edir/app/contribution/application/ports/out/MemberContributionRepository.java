package com.edir.app.contribution.application.ports.out;

import com.edir.app.contribution.domain.entity.MemberContribution;
import com.edir.app.contribution.domain.valueobjects.ContributionId;
import com.edir.app.contribution.domain.valueobjects.MemberContributionId;
import com.edir.app.shared.domain.valueobjects.MemberId;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MemberContributionRepository {
    UUID save(MemberContribution memberContribution);

    Optional<MemberContribution> findByMemberId(MemberId id);
    Optional<MemberContribution> findLatestByMember(MemberContributionId memberId);
    Optional<MemberContribution> findByMemberId(MemberContributionId memberContributionId);
    List<MemberContribution> findByContributionId(ContributionId id);
}
