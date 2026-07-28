package com.edir.app.inventory.domain.entity;

import com.edir.app.inventory.domain.exceptions.InvalidItemQuantityException;
import com.edir.app.inventory.domain.exceptions.NoItemToReturnException;
import com.edir.app.inventory.domain.valueobjects.AllocationId;
import com.edir.app.inventory.domain.valueobjects.ItemId;
import com.edir.app.inventory.domain.valueobjects.ItemQuantity;
import com.edir.app.shared.domain.entity.AggregateRoot;
import com.edir.app.shared.domain.valueobjects.MemberId;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class Allocation extends AggregateRoot<AllocationId> {
    private MemberId holderMemberId;
    private final List<ItemAllocation> itemAllocations = new ArrayList<>();

    protected Allocation(AllocationId allocationId,
                         MemberId holderMemberId,
                         List<ItemAllocation> itemAllocations) {
        super(allocationId);
        this.holderMemberId = holderMemberId;
        this.itemAllocations.addAll(itemAllocations);
    }

    protected Allocation(AllocationId allocationId,
                         MemberId holderMemberId) {
        super(allocationId);
        this.holderMemberId = holderMemberId;
    }

    public static Allocation create(MemberId memberId) {
        return new Allocation(
            AllocationId.generateId(),
            memberId);
    }

    public static Allocation rehydrate(AllocationId allocationId,
                                                 MemberId holderMemberId,
                                                 List<ItemAllocation> itemAllocations) {
        return new Allocation(
            allocationId,
            holderMemberId,
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


    public MemberId getHolderMemberId() {
        return holderMemberId;
    }

    public List<ItemAllocation> getItemAllocations() {
        return List.copyOf(itemAllocations);
    }

}
