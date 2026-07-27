package com.edir.app.inventory.application.services;

import com.edir.app.inventory.application.exceptions.ItemNotFoundException;
import com.edir.app.inventory.application.in.commands.AllocateItemCommand;
import com.edir.app.inventory.application.in.commands.TransferCommand;
import com.edir.app.inventory.application.in.usecases.InventoryAllocationUseCase;
import com.edir.app.inventory.application.out.AllocationRepository;
import com.edir.app.inventory.application.out.ItemRepository;
import com.edir.app.inventory.domain.entity.Allocation;
import com.edir.app.inventory.domain.entity.Item;
import com.edir.app.inventory.domain.valueobjects.ItemId;
import com.edir.app.inventory.domain.valueobjects.ItemQuantity;
import com.edir.app.inventory.domain.valueobjects.ItemStatus;
import com.edir.app.shared.application.usecase.UseCase;
import com.edir.app.shared.domain.valueobjects.MemberId;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@UseCase
@Transactional
class InventoryAllocationService implements InventoryAllocationUseCase {
    private final AllocationRepository allocationRepository;
    private final ItemRepository itemRepository;

    @Override
    public void allocateItemToMember(AllocateItemCommand command) {
        Optional<Allocation> result = allocationRepository
            .findByMemberIdAndItemId(new MemberId(command.memberId()), new ItemId(command.item()));
        Optional<Item> itemResult = itemRepository.findById(new ItemId(command.item()));
        if (itemResult.isEmpty()) {
            throw new ItemNotFoundException("No item found with this item id: " + command.item());
        }

        Item item = itemResult.get();
        if (item.getStatus().equals(ItemStatus.INACTIVE)) {
            throw new IllegalArgumentException("Item is inactive");
        }

        if (result.isEmpty()) {
            var allocation = Allocation
                .create(new MemberId(command.memberId()));

            allocation.allocate(item.getId(), ItemQuantity.of(command.quantity()));

            allocationRepository.save(allocation);
            return;
        }

        Allocation allocation = result.get();
        allocation.allocate(item.getId(), ItemQuantity.of(command.quantity()));
        allocationRepository.save(allocation);
    }

    @Override
    public void increaseAllocationQuantity(AllocateItemCommand command) {
        Optional<Allocation> result = allocationRepository
            .findByMemberIdAndItemId(new MemberId(command.memberId()),
                new ItemId(command.item()));

        if (result.isEmpty()) {
            allocateItemToMember(command);
            return;
        }

        Allocation allocation = result.get();
        allocation.allocate(new ItemId(command.item()), ItemQuantity.of(command.quantity()));
        allocationRepository.save(allocation);
    }

    @Override
    public void reduceAllocationQuantity(AllocateItemCommand command) {
        Optional<Allocation> result = allocationRepository
            .findByMemberIdAndItemId(new MemberId(command.memberId()), new ItemId(command.item()));

        if (result.isEmpty()) {
            return;
        }

        Allocation allocation = result.get();
        allocation.returnItems(new ItemId(command.item()), ItemQuantity.of(command.quantity()));

        allocationRepository.save(allocation);
    }

    @Override
    public void transferAllocation(TransferCommand command) {
        Allocation source = allocationRepository
            .findByMemberIdAndItemId(new MemberId(command.from()),
                new ItemId(command.itemId()))
            .orElseThrow(() -> new ItemNotFoundException("Item not found"));

        source.returnItems(new ItemId(command.itemId()), ItemQuantity.of(command.quantity()));

        Allocation target = allocationRepository
            .findByMemberIdAndItemId(new MemberId(command.to()),
                new ItemId(command.itemId()))
            .orElseGet(() -> Allocation.create(new MemberId(command.to())));

        target.allocate(new ItemId(command.itemId()), ItemQuantity.of(command.quantity()));

        allocationRepository.save(source);
        allocationRepository.save(target);
    }

    @Override
    public List<Allocation> getMemberAllocations(UUID memberId) {
        return allocationRepository.findByMemberId(new MemberId(memberId));
    }

    @Override
    public List<Allocation> getItemAllocations(UUID item) {
        return allocationRepository.findByItemId(new ItemId(item));
    }
}
