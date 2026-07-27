package com.edir.app.inventory.application.out;

import com.edir.app.inventory.adapter.rest.response.AllocationResponse;
import com.edir.app.inventory.adapter.rest.response.ItemAllocationResponse;
import com.edir.app.inventory.domain.entity.Allocation;
import com.edir.app.inventory.domain.valueobjects.AllocationId;
import com.edir.app.shared.domain.valueobjects.MemberId;

import java.util.List;
import java.util.Optional;

public interface AllocationRepository {
    Optional<Allocation> findByAllocationId(AllocationId allocationId);
    Allocation save(Allocation allocation);
    Optional<Allocation> findByMemberId(MemberId memberId);
    Optional<AllocationResponse> findAllocationViewByMemberId(MemberId memberId);
    List<ItemAllocationResponse> findAllocatedItem(MemberId memberId);
}
