package com.edir.app.inventory.application.out;

import com.edir.app.inventory.adapter.rest.response.AllocationResponse;
import com.edir.app.inventory.adapter.rest.response.ItemAllocationResponse;
import com.edir.app.inventory.domain.entity.Allocation;
import com.edir.app.inventory.domain.valueobjects.AllocationId;
import com.edir.app.inventory.domain.valueobjects.ItemId;
import com.edir.app.shared.domain.valueobjects.MemberId;

import java.util.List;
import java.util.Optional;

public interface AllocationRepository {
    Optional<Allocation> findByAllocationId(AllocationId allocationId);
    Optional<Allocation> findByMemberIdAndItemId(MemberId memberId, ItemId itemId);
    Allocation save(Allocation allocation);
    List<Allocation> findByMemberId(MemberId memberId);
    List<Allocation> findByItemId(ItemId itemId);
    Optional<AllocationResponse> findAllocationViewByMemberId(MemberId memberId);
    List<ItemAllocationResponse> findAllocatedItem(MemberId memberId);
}
