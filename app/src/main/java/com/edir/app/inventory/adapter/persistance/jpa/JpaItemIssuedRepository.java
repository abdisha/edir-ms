package com.edir.app.inventory.adapter.persistance.jpa;

import com.edir.app.inventory.adapter.persistance.entity.ItemIssueEntity;
import com.edir.app.inventory.application.ports.out.query.IssueItemView;
import com.edir.app.inventory.application.ports.out.query.IssueView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface JpaItemIssuedRepository extends JpaRepository<ItemIssueEntity, UUID> {
   @Query(
       """
               select new com.edir.app.inventory.application.ports.out.query.IssueView(
                           i.id,
                           i.funeralId,
                           "",
                           i.issuedDate
               ) from ItemIssueEntity i
           """
   )
    List<IssueView> getIssues();

   @Query(
       """
    select new com.edir.app.inventory.application.ports.out.query.IssueItemView(
        i.id as issueId,
        il.itemId,
        it.name,
        it.itemCode,
        il.issuedQuantity as quantity,
        il.fromId,
        s.name as store,
        il.status
    )
    from ItemIssueEntity i
    join i.issuedLineEntities il
    left join ItemEntity it on it.id = il.itemId
    left join StoreEntity s on s.id = il.fromId
    where i.id=:issueId
"""
   )
    List<IssueItemView> getIssuesItem(UUID issueId);

    Optional<ItemIssueEntity> findItemIssueEntitiesByFuneralId(UUID funeralId);
}
