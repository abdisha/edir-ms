package com.edir.app.contribution.adapter.persistance;

import com.edir.app.contribution.adapter.ContributionDataMapper;
import com.edir.app.contribution.adapter.persistance.jpa.JpaMemberContributionRepository;
import com.edir.app.contribution.domain.entity.MemberContribution;
import com.edir.app.contribution.application.ports.out.MemberContributionRepository;
import com.edir.app.contribution.domain.valueobjects.ContributionId;
import com.edir.app.contribution.domain.valueobjects.MemberContributionId;
import com.edir.app.shared.domain.valueobjects.MemberId;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Repository
@SuppressWarnings("unused")
public class MemberContributionRepositoryImpl implements MemberContributionRepository {

    private final JpaMemberContributionRepository jpaMemberContributionRepository;
    private final ContributionDataMapper mapper;


    @Override
    public UUID save(MemberContribution memberContribution) {
        return jpaMemberContributionRepository
            .save(mapper.memberContributionToMemberContributionEntity(memberContribution)).getId();
    }

    @Override
    public Optional<MemberContribution> findByMemberId(MemberId id) {
        return jpaMemberContributionRepository
            .findMemberContributionEntitiesByMemberId(id.value())
            .map(mapper::memberContributionToMemberContributionEntity);
    }

    @Override
    public Optional<MemberContribution> findLatestByMember(MemberContributionId memberId) {
        return jpaMemberContributionRepository
            .findLastMemberContribution(memberId.value())
            .map(mapper::memberContributionToMemberContributionEntity);
    }

    @Override
    public Optional<MemberContribution> findByMemberId(MemberContributionId memberContributionId) {
        return jpaMemberContributionRepository
            .findById(memberContributionId.value())
            .map(mapper::memberContributionToMemberContributionEntity);
    }

    @Override
    public List<MemberContribution> findByContributionId(ContributionId id) {
        return jpaMemberContributionRepository.findAllByContributionId(id.value())
            .stream().map(mapper::memberContributionToMemberContributionEntity).toList();
    }
}
