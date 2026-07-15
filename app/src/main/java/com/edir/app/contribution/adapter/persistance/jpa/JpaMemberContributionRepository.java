package com.edir.app.contribution.adapter.persistance.jpa;

import com.edir.app.contribution.adapter.persistance.entity.MemberContributionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface JpaMemberContributionRepository extends JpaRepository<MemberContributionEntity, UUID> {
    @Query(
        value = """
            select m from MemberContributionEntity m
                        where m.memberId = :memberId
                                     order by m.id desc limit 1
            """
    )
    Optional<MemberContributionEntity> findLastMemberContribution(UUID memberId);

    Optional<MemberContributionEntity> findMemberContributionEntitiesByMemberId(UUID memberId);

    List<MemberContributionEntity> findAllByContributionId(UUID contributionId);
}
