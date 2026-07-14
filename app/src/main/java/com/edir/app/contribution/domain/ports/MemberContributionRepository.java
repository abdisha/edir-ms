package com.edir.app.contribution.domain.ports;

import com.edir.app.contribution.domain.entity.MemberContribution;
import com.edir.app.contribution.domain.valueobjects.ContributionId;
import com.edir.app.shared.domain.valueobjects.MemberId;

import java.util.Optional;
import java.util.UUID;

public interface MemberContributionRepository {
    UUID save(MemberContribution memberContribution);
    Optional<MemberContribution> find(MemberId id);
    Optional<MemberContribution> findByContributionIdAndMemberId(ContributionId contributionId, MemberId memberId);

    Optional<MemberContribution> findLatestByMember(UUID memberId);
}
