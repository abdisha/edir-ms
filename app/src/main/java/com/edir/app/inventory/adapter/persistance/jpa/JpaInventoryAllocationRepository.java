package com.edir.app.inventory.adapter.persistance.jpa;

import com.edir.app.inventory.adapter.persistance.entity.AllocationEntity;
import com.edir.app.inventory.application.ports.out.query.AllocationView;
import com.edir.app.inventory.application.ports.out.query.StoreAllocationSummaryView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface JpaInventoryAllocationRepository extends JpaRepository<AllocationEntity, UUID> {

    Optional<AllocationEntity> findAllocationEntitiesByStoreId(UUID holderMemberId);
    @Query(
        value = """
                select new com.edir.app.inventory.application.out.query.AllocationView(
                    a.allocationId,
                    a.storeId,
                    s.name as storeName,
                    s.storeOwner,
                    it.id as itemId,
                    it.name,
                    it.itemCode,
                    i.quantityOnHand,
                    i.issuedOutQuantity,
                    i.receivedDate
                        )
                        from AllocationEntity  a
                        join a.itemAllocations i
                        left join ItemEntity  it on it.id = i.itemId
                        left join StoreEntity s on s.id = a.storeId
                where i.itemId=:itemId
            """
    )
    List<AllocationView> findAllocationViewByItemId(UUID itemId);


    @Query(
        value = """
                select new com.edir.app.inventory.application.out.query.AllocationView(
                    a.allocationId,
                    a.storeId,
                    s.name as storeName,
                    s.storeOwner,
                    it.id as itemId,
                    it.name,
                    it.itemCode,
                    i.quantityOnHand,
                    i.issuedOutQuantity,
                    i.receivedDate
                        )
                        from AllocationEntity  a
                        join a.itemAllocations i
                        left join ItemEntity  it on it.id = i.itemId
                        left join StoreEntity s on s.id = a.storeId
                where a.storeId=:storeId
            """
    )
    List<AllocationView> findAllocationViewByStoreId(UUID storeId);

    @Query(value = """
    SELECT new com.edir.app.inventory.application.out.query.StoreAllocationSummaryView(
        s.id,
        s.name,
        s.location,
        size(i.itemAllocations)
    )
    from StoreEntity s
    left join AllocationEntity i on i.storeId = s.id
    """)
    List<StoreAllocationSummaryView> getStoreAllocationSummary();



}
