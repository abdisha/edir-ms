package com.edir.app.inventory.application.out;

import com.edir.app.inventory.domain.entity.InventoryAllocation;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InventoryAllocationRepository {
    Optional<InventoryAllocation> findById(UUID allocationId);
    Optional<InventoryAllocation> findById(UUID memberId,UUID itemId);
    InventoryAllocation save(InventoryAllocation allocation);
    List<InventoryAllocation> findByMemberId(UUID memberId);
    List<InventoryAllocation> findByItemId(UUID itemId);
}
