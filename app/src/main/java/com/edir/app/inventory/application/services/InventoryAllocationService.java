package com.edir.app.inventory.application.services;

import com.edir.app.inventory.application.commands.TransferCommand;
import com.edir.app.inventory.application.out.InventoryAllocationRepository;
import com.edir.app.inventory.application.usecases.InventoryAllocationUseCase;
import com.edir.app.inventory.domain.entity.InventoryAllocation;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class InventoryAllocationService implements InventoryAllocationUseCase {
    private final InventoryAllocationRepository allocationRepository;

    public InventoryAllocationService(InventoryAllocationRepository allocationRepository) {
        this.allocationRepository = allocationRepository;
    }

    @Override
    public void allocateItemToMember(UUID item, Integer quantity, UUID memberId) {
        var allocation = InventoryAllocation.create(
            item,
            memberId,
            quantity
        );
        allocationRepository.save(allocation);
    }

    @Override
    public void increaseAllocationQuantity(UUID item, Integer quantity, UUID memberId) {
        Optional<InventoryAllocation> result = allocationRepository.findById(memberId, item);

        if (result.isEmpty()) {
            allocateItemToMember(item, quantity, memberId);
            return;
        }

        InventoryAllocation inventoryAllocation = result.get();
        inventoryAllocation.receive(quantity);

        allocationRepository.save(inventoryAllocation);

    }

    @Override
    public void reduceAllocationQuantity(UUID item, Integer quantity, UUID memberId) {
        Optional<InventoryAllocation> result = allocationRepository.findById(memberId, item);

        if (result.isEmpty()) {
            return;
        }

        InventoryAllocation inventoryAllocation = result.get();
        inventoryAllocation.issue(quantity);
        allocationRepository.save(inventoryAllocation);
    }

    @Override
    public void transferAllocation(TransferCommand command) {
        Optional<InventoryAllocation> result = allocationRepository.findById(command.from(), command.item().getItem());

        if (result.isEmpty()) {
            return;
        }

        InventoryAllocation inventoryAllocation = result.get();
        inventoryAllocation.transferTo(command.to());

        allocationRepository.save(inventoryAllocation);
    }

    @Override
    public List<InventoryAllocation> getMemberAllocations(UUID memberId) {
        return allocationRepository.findByMemberId(memberId);
    }

    @Override
    public List<InventoryAllocation> getItemAllocations(UUID item) {
        return allocationRepository.findByItemId(item);
    }
}
