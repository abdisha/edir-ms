package com.edir.app.edir.adapter.persistance.jpa;

import com.edir.app.edir.adapter.persistance.entity.EdirEntity;
import com.edir.app.edir.application.api.MemberSummary;
import com.edir.app.edir.application.query.EdirView;
import com.edir.app.edir.application.query.MemberDetailView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EdirJpaRepository extends JpaRepository<EdirEntity, UUID> {
    Optional<EdirEntity> findById(String uuid);
    Optional<EdirEntity> findFirstBy();

    @Query(value = """
        SELECT new com.edir.app.edir.application.query.EdirView(
            e.id,
            e.name,
            e.description,
            e.city,
            e.subCity,
            e.worda,
            e.establishedDate,
            e.phoneNumber,
            COUNT(m)
        )
        FROM EdirEntity e
        LEFT JOIN e.members m
        GROUP BY
            e.id,
            e.name,
            e.description,
            e.city,
            e.subCity,
            e.worda,
            e.phoneNumber
        """)
    Optional<EdirView> findEdir();

    @Query(
            value = """
                    SELECT new com.edir.app.edir.application.query.MemberDetailView(
                            m.id,
                            m.firstName,
                            m.middleName,
                            m.lastName,
                            m.age,
                            m.gender,
                            m.city,
                            m.subCity,
                            m.worda,
                            m.phoneNumber,
                            m.joinedDate,
                            m.leftDate,
                            m.memberStatus,
                            m.isDeceased
                    )
                    FROM EdirEntity e
                    JOIN e.members m
                    WHERE m.id = :memberId
                    """
    )
    Optional<MemberDetailView> findMember(UUID memberId);

    @Query(
        value = """
                   SELECT new com.edir.app.edir.application.api.MemberSummary(
                    m.id,
                   concat(  m.firstName , " ",m.middleName ," ",m.lastName) as fullName

                   ) FROM EdirEntity  as e
                    join e.members m
                    where m.memberStatus =MemberStatus.ACTIVE

            """
    )
    Optional<List<MemberSummary>> findActiveMember();
}
