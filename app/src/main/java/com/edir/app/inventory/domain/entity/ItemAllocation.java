package com.edir.app.inventory.domain.entity;

import com.edir.app.inventory.domain.exceptions.InsufficientQuantityException;
import com.edir.app.inventory.domain.valueobjects.ItemAllocationId;
import com.edir.app.inventory.domain.valueobjects.ItemId;
import com.edir.app.inventory.domain.valueobjects.ItemQuantity;
import com.edir.app.shared.domain.entity.BaseEntity;

import java.time.ZonedDateTime;

public class ItemAllocation extends BaseEntity<ItemAllocationId> {
    private final ItemId itemId;
    private ItemQuantity quantity;
    private final ZonedDateTime receivedDate;

    protected ItemAllocation(ItemAllocationId itemAllocationId,
                             ItemId itemId, ItemQuantity
                                 quantity, ZonedDateTime
                                 receivedDate) {
        super(itemAllocationId);
        this.itemId = itemId;
        this.quantity = quantity;
        this.receivedDate = receivedDate;
    }

    public static ItemAllocation create(ItemId itemId,
                                        ItemQuantity quantity) {
        return new ItemAllocation(ItemAllocationId.generateId(),
            itemId,
            quantity,
            ZonedDateTime.now());

    }

    public static ItemAllocation rehydrate(ItemAllocationId id,
                                           ItemId itemId,
                                           ItemQuantity quantity,
                                           ZonedDateTime receivedDate) {
        return new ItemAllocation(id, itemId, quantity, receivedDate);
    }

    public void allocateItems(ItemQuantity quantity) {
        if (quantity.quantity() < 0) {
            throw new IllegalArgumentException("Quantity cannot be negative");
        }
        this.quantity = this.quantity.addQuantity(quantity.quantity());
    }

    public void returnItems(ItemQuantity quantity) {
        if (quantity.quantity() < 0
            || quantity.quantity() > this.quantity.quantity()) {
            throw new InsufficientQuantityException(this.itemId, this.quantity, quantity);
        }

        this.quantity = this.quantity.subtractQuantity(quantity.quantity());
    }


    public ItemId getItemId() {
        return itemId;
    }

    public ItemQuantity getQuantity() {
        return quantity;
    }

    public ZonedDateTime getReceivedDate() {
        return receivedDate;
    }


}
