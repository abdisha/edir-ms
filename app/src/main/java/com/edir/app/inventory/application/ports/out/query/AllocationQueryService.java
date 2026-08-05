package com.edir.app.inventory.application.ports.out.query;

import com.edir.app.inventory.adapter.rest.response.AllocationResponse;
import com.edir.app.inventory.application.ports.out.AllocationRepository;
import com.edir.app.inventory.domain.valueobjects.StoreId;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Service
public class AllocationQueryService {
    private final AllocationRepository allocationRepository;

    public List<AllocationResponse> findByStoreId(UUID storeId) {
        return allocationRepository.findAllocationViewByStoreId(new StoreId(storeId));
    }

    public List<AllocationResponse> findAllocatedItem(UUID storeId) {
     return allocationRepository.findAllocatedItem(new StoreId(storeId));
    }

    public List<StoreAllocationSummaryView> getAllocationSummary(){
        return allocationRepository.getAllocationSummary();
    }

}
