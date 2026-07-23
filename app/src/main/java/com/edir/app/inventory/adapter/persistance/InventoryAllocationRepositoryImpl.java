package com.edir.app.inventory.adapter.persistance;

import com.edir.app.inventory.adapter.InventoryDataMapper;
import com.edir.app.inventory.adapter.persistance.jpa.JpaInventoryAllocationRepository;
import com.edir.app.inventory.application.out.InventoryAllocationRepository;
import com.edir.app.inventory.domain.entity.InventoryAllocation;
import com.edir.app.shared.adapter.PersistenceAdapter;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@PersistenceAdapter
record InventoryAllocationRepositoryImpl(JpaInventoryAllocationRepository allocationRepository,
                                         InventoryDataMapper mapper)
    implements InventoryAllocationRepository {

    @Override
    public Optional<InventoryAllocation> findByAllocationId(UUID allocationId) {
        return allocationRepository.findById(allocationId)
            .map(mapper::inventoryAllocationEntityToInventoryAllocation);
    }

    @Override
    public Optional<InventoryAllocation> findByMemberIdAndItemId(UUID memberId, UUID itemId) {
        return allocationRepository.findInventoryAllocationEntitiesByItemIdAndHolderMemberId(itemId, memberId)
            .map(mapper::inventoryAllocationEntityToInventoryAllocation);
    }

    @Override
    public InventoryAllocation save(InventoryAllocation allocation) {
        return mapper.inventoryAllocationEntityToInventoryAllocation(allocationRepository
            .save(mapper.inventoryAllocationToInventoryAllocationEntity(allocation)));
    }

    @Override
    public List<InventoryAllocation> findByMemberId(UUID memberId) {
        return allocationRepository.findInventoryAllocationEntitiesByHolderMemberId(memberId)
            .stream()
            .map(mapper::inventoryAllocationEntityToInventoryAllocation)
            .toList();
    }

    @Override
    public List<InventoryAllocation> findByItemId(UUID itemId) {
        return allocationRepository.findInventoryAllocationEntitiesByItemId(itemId)
            .stream().map(mapper::inventoryAllocationEntityToInventoryAllocation)
            .toList();
    }
}
