package com.edir.app.inventory.application.services;

import com.edir.app.inventory.application.exceptions.ItemNotFoundException;
import com.edir.app.inventory.application.in.commands.AllocateItemCommand;
import com.edir.app.inventory.application.in.commands.TransferCommand;
import com.edir.app.inventory.application.in.usecases.InventoryAllocationUseCase;
import com.edir.app.inventory.application.out.InventoryAllocationRepository;
import com.edir.app.inventory.domain.entity.Allocation;
import com.edir.app.shared.application.usecase.UseCase;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@UseCase
@Transactional
class InventoryAllocationService implements InventoryAllocationUseCase {
    private final InventoryAllocationRepository allocationRepository;

    @Override
    public void allocateItemToMember(AllocateItemCommand command) {
        var allocation = Allocation.create(
            command.item(),
            command.memberId(),
            command.quantity()
        );
        allocationRepository.save(allocation);
    }

    @Override
    public void increaseAllocationQuantity(AllocateItemCommand command) {
        Optional<Allocation> result = allocationRepository
            .findByMemberIdAndItemId(command.memberId(), command.item());

        if (result.isEmpty()) {
            allocateItemToMember(command);
            return;
        }

        Allocation allocation = result.get();
        allocation.receive(command.quantity());

        allocationRepository.save(allocation);

    }

    @Override
    public void reduceAllocationQuantity(AllocateItemCommand command) {
        Optional<Allocation> result = allocationRepository
            .findByMemberIdAndItemId(command.memberId(), command.item());

        if (result.isEmpty()) {
            return;
        }

        Allocation allocation = result.get();
        allocation.issue(command.quantity());
        allocationRepository.save(allocation);
    }

    @Override
    public void transferAllocation(TransferCommand command) {
        Allocation source = allocationRepository.findByMemberIdAndItemId(
            command.from(),
            command.item().getItemId()
        ).orElseThrow(
            () -> new ItemNotFoundException("Item not found")
        );

        source.issue(command.quantity());

        Allocation target = allocationRepository.findByMemberIdAndItemId(
            command.to(),
            command.item().getItemId()
        ).orElseGet(() -> Allocation.create(
                command.item().getItemId(),
                command.to(),
                command.quantity()
            )
        );

        target.receive(command.quantity());

        allocationRepository.save(source);
        allocationRepository.save(target);
    }

    @Override
    public List<Allocation> getMemberAllocations(UUID memberId) {
        return allocationRepository.findByMemberId(memberId);
    }

    @Override
    public List<Allocation> getItemAllocations(UUID item) {
        return allocationRepository.findByItemId(item);
    }
}
