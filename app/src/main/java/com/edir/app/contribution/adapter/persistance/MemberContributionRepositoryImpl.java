package com.edir.app.contribution.adapter.persistance;

import com.edir.app.contribution.adapter.persistance.jpa.JpaMemberContributionRepository;
import com.edir.app.contribution.domain.entity.MemberContribution;
import com.edir.app.contribution.domain.ports.MemberContributionRepository;
import com.edir.app.contribution.domain.valueobjects.ContributionId;
import com.edir.app.shared.domain.valueobjects.MemberId;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Repository
@SuppressWarnings("unused")
public class MemberContributionRepositoryImpl implements MemberContributionRepository {

    private final JpaMemberContributionRepository jpaMemberContributionRepository;

    @Override
    public UUID save(MemberContribution memberContribution) {
        return jpaMemberContributionRepository.save(memberContribution).getId().value();
    }

    @Override
    public Optional<MemberContribution> find(MemberId id) {
        return jpaMemberContributionRepository
            .findById(id.value());
    }

    @Override
    public Optional<MemberContribution> findByContributionIdAndMemberId(ContributionId contributionId, MemberId memberId) {
        return jpaMemberContributionRepository
            .findMemberContributionByMemberIdAndContributionId(
                memberId.value(),
                contributionId.value()
            );
    }


    @Override
    public Optional<MemberContribution> findLatestByMember(UUID memberId) {
        return jpaMemberContributionRepository.findbyMemberId(memberId);
    }
}
