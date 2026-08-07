package com.edir.app.inventory.application.services;

import com.edir.app.inventory.application.exceptions.ItemNotFoundException;
import com.edir.app.inventory.application.ports.in.commands.AllocateItemCommand;
import com.edir.app.inventory.application.ports.in.commands.TransferCommand;
import com.edir.app.inventory.application.ports.in.usecases.InventoryAllocationUseCase;
import com.edir.app.inventory.application.ports.out.AllocationRepository;
import com.edir.app.inventory.application.ports.out.ItemRepository;
import com.edir.app.inventory.domain.entity.Allocation;
import com.edir.app.inventory.domain.entity.Item;
import com.edir.app.inventory.domain.exceptions.InsufficientQuantityException;
import com.edir.app.inventory.domain.valueobjects.ItemId;
import com.edir.app.inventory.domain.valueobjects.ItemQuantity;
import com.edir.app.inventory.domain.valueobjects.ItemStatus;
import com.edir.app.inventory.domain.valueobjects.StoreId;
import com.edir.app.shared.application.usecase.UseCase;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

import java.util.Optional;

@AllArgsConstructor
@UseCase
@Transactional
class InventoryAllocationService implements InventoryAllocationUseCase {
    private final AllocationRepository allocationRepository;
    private final ItemRepository itemRepository;

    @Override
    public void assignStore(AllocateItemCommand command) {
        Optional<Allocation> result = allocationRepository
            .findByStoreId(new StoreId(command.storeId()));
        Optional<Item> itemResult = itemRepository.findById(new ItemId(command.item()));

        if (itemResult.isEmpty()) {
            throw new ItemNotFoundException("No item found with this item id: " + command.item());
        }

        Item item = itemResult.get();
        if (item.getStatus().equals(ItemStatus.INACTIVE)) {
            throw new ItemNotFoundException("Item is inactive");
        }
        if(item.getQuantityAtHand().quantity()<command.quantity()){
            throw new InsufficientQuantityException(item.getId(),
                new ItemQuantity(command.quantity()),
                item.getQuantityAtHand());
        }

        if (result.isEmpty()) {
            var allocation = Allocation
                .create(new StoreId(command.storeId()));

            allocation.allocate(item.getId(), ItemQuantity.of(command.quantity()));

            allocationRepository.save(allocation);
            return;
        }

        Allocation allocation = result.get();
        allocation.allocate(item.getId(), ItemQuantity.of(command.quantity()));

        item.itemAllocated(new ItemQuantity(command.quantity()));

        itemRepository.save(item);
        allocationRepository.save(allocation);
    }

    @Override
    public void increaseAllocationQuantity(AllocateItemCommand command) {
        Optional<Allocation> result = allocationRepository
            .findByStoreId(new StoreId(command.storeId()));

        if (result.isEmpty()) {
            assignStore(command);
            return;
        }

        Allocation allocation = result.get();
        allocation.allocate(new ItemId(command.item()), ItemQuantity.of(command.quantity()));
        allocationRepository.save(allocation);
    }

//    @Override
//    public void reduceAllocationQuantity(AllocateItemCommand command) {
//        Optional<Allocation> result = allocationRepository
//            .findByStoreId(new StoreId(command.storeId()));
//        Optional<Item> itemResult = itemRepository.findById(new ItemId(command.item()));
//
//        if (itemResult.isEmpty()) {
//            throw new ItemNotFoundException("No item found with this item id: " + command.item());
//        }
//        Item item = itemResult.get();
//        if (result.isEmpty()) {
//            return;
//        }
//
//        Allocation allocation = result.get();
//        allocation.returnItems(new ItemId(command.item()), ItemQuantity.of(command.quantity()));
//        item.itemReturned(new ItemQuantity(command.quantity()));
//
//        itemRepository.save(item);
//        allocationRepository.save(allocation);
//    }

    @Override
    public void transferAllocation(TransferCommand command) {
        Allocation source = allocationRepository
            .findByStoreId(new StoreId(command.fromStore()))
            .orElseThrow(() -> new ItemNotFoundException("Item not found"));

        source.returnItems(new ItemId(command.itemId()), ItemQuantity.of(command.quantity()));

        Allocation target = allocationRepository
            .findByStoreId(new StoreId(command.toStore()))
            .orElseGet(() -> Allocation.create(new StoreId(command.toStore())));

        target.allocate(new ItemId(command.itemId()), ItemQuantity.of(command.quantity()));

        allocationRepository.save(source);
        allocationRepository.save(target);
    }
}
