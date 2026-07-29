package com.edir.app.inventory.domain.entity;

import com.edir.app.inventory.domain.exceptions.InvalidItemQuantityException;
import com.edir.app.inventory.domain.exceptions.NoItemToReturnException;
import com.edir.app.inventory.domain.valueobjects.AllocationId;
import com.edir.app.inventory.domain.valueobjects.ItemId;
import com.edir.app.inventory.domain.valueobjects.ItemQuantity;
import com.edir.app.inventory.domain.valueobjects.StoreId;
import com.edir.app.shared.domain.entity.AggregateRoot;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class Allocation extends AggregateRoot<AllocationId> {
    private StoreId storeId;
    private final List<ItemAllocation> itemAllocations = new ArrayList<>();

    protected Allocation(AllocationId allocationId,
                         StoreId storeId,
                         List<ItemAllocation> itemAllocations) {
        super(allocationId);
        this.storeId = storeId;
        this.itemAllocations.addAll(itemAllocations);
    }

    protected Allocation(AllocationId allocationId,
                         StoreId storeId) {
        super(allocationId);
        this.storeId = storeId;
    }

    public static Allocation create(StoreId storeId) {
        return new Allocation(
            AllocationId.generateId(),
            storeId);
    }

    public static Allocation rehydrate(AllocationId allocationId,
                                                 StoreId storeId,
                                                 List<ItemAllocation> itemAllocations) {
        return new Allocation(
            allocationId,
            storeId,
            itemAllocations
        );
    }

    public void allocate(ItemId id, ItemQuantity quantity) {
        validatePositiveQuantity(quantity.quantity());

        Optional<ItemAllocation> itemAllocation = itemAllocations.stream()
            .filter(item -> item.getItemId()
                .equals(id)).findFirst();

        if (itemAllocation.isEmpty()) {
            itemAllocations.add(ItemAllocation.create(id, quantity));
            return;
        }

        itemAllocation.ifPresent(allocation -> allocation.allocateItems(quantity));
    }

    public void returnItems(ItemId id, ItemQuantity quantity){
        validatePositiveQuantity(quantity.quantity());
        Optional<ItemAllocation> optionalItemAllocation = itemAllocations.stream()
            .filter(item -> item.getItemId()
                .equals(id)).findFirst();

        if (optionalItemAllocation.isEmpty()){
            throw new NoItemToReturnException(id);
        }

        optionalItemAllocation.get().returnItems(quantity);

    }
    public void issueItems(ItemId id, ItemQuantity quantity){
        validatePositiveQuantity(quantity.quantity());
        Optional<ItemAllocation> optionalItemAllocation = itemAllocations.stream()
            .filter(item -> item.getItemId()
                .equals(id))
            .findFirst();

        if (optionalItemAllocation.isEmpty()){
            throw new NoItemToReturnException(id);
        }

        optionalItemAllocation.get().issueItem(quantity);

    }
    private static void validatePositiveQuantity(int quantity) {
        if (quantity <= 0) {
            throw new InvalidItemQuantityException(
                "Quantity must be greater than zero"
            );
        }
    }


    public StoreId getStoreId() {
        return storeId;
    }

    public List<ItemAllocation> getItemAllocations() {
        return List.copyOf(itemAllocations);
    }

}
