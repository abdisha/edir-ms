package com.edir.app.contribution.adapter.persistance.jpa;

import com.edir.app.contribution.adapter.persistance.entity.ContributionEntity;
import com.edir.app.contribution.application.ports.out.query.ContributionView;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface JpaContributionRepository extends JpaRepository<ContributionEntity, UUID> {
    @Query(
        value = """
                select c from ContributionEntity c where c.status = 'OPEN'
            """
    )
    Optional<ContributionEntity> findContributionEntityByOpenStatus();

    @Query(value = """
                select new  com.edir.app.contribution.application.ports.out.query.ContributionView(
                 c.id,
                c.name,
                c.description,
                c.startDate,
                c.endDate,
                c.dueDate,
                c.penaltyAmount,
                c.contributionAmount,
                c.penaltyType,
                c.status
                )
                from  ContributionEntity  as c
        """)
    Page<ContributionView> findAllContributions(Pageable pageable);

    @Query(value = """
                select new  com.edir.app.contribution.application.ports.out.query.ContributionView(
                 c.id,
                c.name,
                c.description,
                c.startDate,
                c.endDate,
                c.dueDate,
                c.penaltyAmount,
                c.contributionAmount,
                c.penaltyType,
                c.status
                )
                from  ContributionEntity  as c where c.status='OPEN'
        """)
    Optional<ContributionView> findActiveContribution();
}
