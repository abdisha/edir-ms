package com.edir.app.inventory.application.out;

import com.edir.app.inventory.domain.entity.Allocation;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InventoryAllocationRepository {
    Optional<Allocation> findByAllocationId(UUID allocationId);
    Optional<Allocation> findByMemberIdAndItemId(UUID memberId, UUID itemId);
    Allocation save(Allocation allocation);
    List<Allocation> findByMemberId(UUID memberId);
    List<Allocation> findByItemId(UUID itemId);
}
