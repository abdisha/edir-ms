package com.edir.app.inventory.application.out.query;

import com.edir.app.inventory.adapter.rest.response.AllocationResponse;
import com.edir.app.inventory.adapter.rest.response.ItemAllocationResponse;
import com.edir.app.inventory.application.out.AllocationRepository;
import com.edir.app.shared.domain.valueobjects.MemberId;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Service
public class AllocationQueryService {
    private final AllocationRepository allocationRepository;

    public Optional<AllocationResponse> findByMemberId(UUID memberId) {
        return allocationRepository.findAllocationViewByMemberId(new MemberId(memberId));
    }

    public List<ItemAllocationResponse> findAllocatedItem(UUID memberId) {
     return allocationRepository.findAllocatedItem(new MemberId(memberId));
    }

}
