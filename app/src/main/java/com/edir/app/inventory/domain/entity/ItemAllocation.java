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
    private ItemQuantity issuedQuantity;
    private final ZonedDateTime receivedDate;
    private ZonedDateTime issuedDate;

    protected ItemAllocation(ItemAllocationId itemAllocationId,
                             ItemId itemId,
                             ItemQuantity quantity,
                             ItemQuantity issuedQuantity,
                             ZonedDateTime receivedDate,
                             ZonedDateTime issuedDate) {
        super(itemAllocationId);
        this.itemId = itemId;
        this.quantity = quantity;
        this.receivedDate = receivedDate;
        this.issuedQuantity = issuedQuantity;
        this.issuedDate = issuedDate;

    }

    public static ItemAllocation create(ItemId itemId,
                                        ItemQuantity quantity) {
        return new ItemAllocation(ItemAllocationId.generateId(),
            itemId,
            quantity,
            ItemQuantity.of(0),
            ZonedDateTime.now(),
            ZonedDateTime.now()
        );

    }

    public static ItemAllocation rehydrate(ItemAllocationId id,
                                           ItemId itemId,
                                           ItemQuantity quantity,
                                           ItemQuantity issuedQuantity,
                                           ZonedDateTime receivedDate,
                                           ZonedDateTime issuedDate) {
        return new ItemAllocation(id, itemId, quantity,issuedQuantity, receivedDate,issuedDate);
    }

    public void allocateItems(ItemQuantity quantity) {
        validateItemQuantity(quantity);
        this.quantity = this.quantity.addQuantity(quantity.quantity());
    }

    public void returnItems(ItemQuantity quantity) {
        validateItemQuantity(quantity);
        this.quantity = this.quantity.subtractQuantity(quantity.quantity());
    }

    public  void issueItem(ItemQuantity quantity){
        validateItemQuantity(quantity);

        this.issuedQuantity=this.issuedQuantity.addQuantity(quantity.quantity());
        this.quantity=this.quantity.subtractQuantity(quantity.quantity());
        this.issuedDate=ZonedDateTime.now();
    }

    public ItemQuantity getIssuedQuantity() {
        return issuedQuantity;
    }

    private  void validateItemQuantity(ItemQuantity quantity) {
        if (quantity.quantity() < 0) {
            throw new InsufficientQuantityException(this.itemId, this.quantity, quantity);
        }
    }

    public ZonedDateTime getIssuedDate() {
        return issuedDate;
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
