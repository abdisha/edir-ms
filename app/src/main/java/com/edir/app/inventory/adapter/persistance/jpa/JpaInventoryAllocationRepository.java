package com.edir.app.inventory.adapter.persistance.jpa;

import com.edir.app.inventory.adapter.persistance.entity.AllocationEntity;
import com.edir.app.inventory.application.out.query.AllocationItemView;
import com.edir.app.inventory.application.out.query.AllocationView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface JpaInventoryAllocationRepository extends JpaRepository<AllocationEntity, UUID> {

    Optional<AllocationEntity> findAllocationEntitiesByHolderMemberId(UUID holderMemberId);
    @Query(
        value = """
                select new com.edir.app.inventory.application.out.query.AllocationView(
                    a.allocationId,
                    a.holderMemberId
                        )
                        from AllocationEntity  a where a.holderMemberId=:memberId
            """
    )
    Optional<AllocationView> findAllocationViewByMemberId(UUID memberId);

    @Query(
        value = """
    select  new com.edir.app.inventory.application.out.query.AllocationItemView(
    ai.itemId,
    it.name,
    ai.quantityOnHand,
    ai.issuedOutQuantity,
    ai.receivedDate

    )
    from AllocationEntity  as a join a.itemAllocations ai
    left  join ItemEntity  it on it.id = ai.itemId where a.holderMemberId=:memberId
"""
    )
    List<AllocationItemView> findAllocationItemViewByItemId(UUID memberId);


}
