package com.edir.app.inventory.adapter.persistance.jpa;

import com.edir.app.inventory.adapter.persistance.entity.InventoryAllocationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface JpaInventoryAllocationRepository extends JpaRepository<InventoryAllocationEntity, UUID> {
    Optional<InventoryAllocationEntity> findInventoryAllocationEntitiesByItemIdAndHolderMemberId(UUID itemId, UUID holderMemberId);

    List<InventoryAllocationEntity> findInventoryAllocationEntitiesByHolderMemberId(UUID holderMemberId);

    List<InventoryAllocationEntity> findInventoryAllocationEntitiesByItemId(UUID itemId);
}
