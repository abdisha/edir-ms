package com.edir.app.inventory.application.ports.out;

import com.edir.app.inventory.adapter.rest.response.AllocationResponse;
import com.edir.app.inventory.application.ports.out.query.StoreAllocationSummaryView;
import com.edir.app.inventory.domain.entity.Allocation;
import com.edir.app.inventory.domain.valueobjects.StoreId;

import java.util.List;
import java.util.Optional;

public interface AllocationRepository {
    Allocation save(Allocation allocation);
    Optional<Allocation> findByStoreId(StoreId storeId);
    List<AllocationResponse> findAllocationViewByStoreId(StoreId storeId);
    List<AllocationResponse> findAllocatedItem(StoreId storeId);
    List<StoreAllocationSummaryView> getAllocationSummary();
}
