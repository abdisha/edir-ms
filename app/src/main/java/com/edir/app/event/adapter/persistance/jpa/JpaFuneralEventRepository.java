package com.edir.app.event.adapter.persistance.jpa;

import com.edir.app.event.adapter.persistance.entity.FuneralEventEntity;
import com.edir.app.event.application.port.out.query.FuneralEventView;
import com.edir.app.event.application.port.out.query.ItemIssueView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface JpaFuneralEventRepository extends JpaRepository<FuneralEventEntity, UUID> {

    @Query(value = """
            SELECT new com.edir.app.event.application.port.out.query.FuneralEventView(
            fe.funeralEventId,
            fe.name,
            fe.funeralDate,
            fe.deceasedPersonFullName,
            fe.relationShip,
            fe.mournerId,
              fe.payOut,
                       fe.isClosed)
                     FROM FuneralEventEntity fe order by fe.funeralDate desc
        """)
    List<FuneralEventView> findAllFuneralEventView();

    @Query(value = """
            SELECT new com.edir.app.event.application.port.out.query.FuneralEventView(
            fe.funeralEventId,
            fe.name,
            fe.funeralDate,
            fe.deceasedPersonFullName,
            fe.relationShip,
            fe.mournerId,
           fe.payOut,
            fe.isClosed)
                     FROM FuneralEventEntity fe where fe.funeralEventId=:id order by fe.funeralDate desc
        """)
    Optional<FuneralEventView> findFuneralEventViewById(UUID id);

    @Query(value = """
        SELECT new com.edir.app.event.application.port.out.query.ItemIssueView(
        ie.id,
        ie.itemCode,
        ie.name,
        ie.quantity
        )
        FROM FuneralEventEntity fe
         JOIN fe.itemEntities ie
         where fe.funeralEventId=:id order by fe.funeralDate desc
"""
    )
    List<ItemIssueView> findItemIssueViewByFuneralId(UUID id);
}
