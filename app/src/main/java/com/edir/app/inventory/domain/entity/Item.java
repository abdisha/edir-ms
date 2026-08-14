package com.edir.app.inventory.domain.entity;

import com.edir.app.inventory.domain.exceptions.ItemCannotBeInActiveException;
import com.edir.app.inventory.domain.valueobjects.ItemId;
import com.edir.app.inventory.domain.valueobjects.ItemQuantity;
import com.edir.app.inventory.domain.valueobjects.ItemStatus;
import com.edir.app.shared.domain.entity.BaseEntity;
import com.edir.app.shared.domain.exceptions.DomainValidationException;
import com.edir.app.shared.domain.valueobjects.ItemCode;

import java.util.Objects;

public class  Item extends BaseEntity<ItemId> {;
    private final ItemCode itemCode;
    private String itemName;
    private ItemQuantity quantityAtHand;
    private ItemQuantity allocatedQuantity;
    private ItemStatus status;

    private Item(ItemId itemId,
                ItemCode itemCode,
                String itemName,
                ItemQuantity quantityAtHand,
                ItemQuantity allocatedQuantity,
                ItemStatus status) {
        super(itemId);
        this.itemCode = itemCode;
        this.itemName = itemName;
        this.quantityAtHand = quantityAtHand;
        this.allocatedQuantity = allocatedQuantity;
        this.status =status;
    }

    public static Item registerItem(ItemCode itemCode,
                                    String itemName,
                                    ItemQuantity quantityAtHand){
        return new Item(ItemId.generateId(),
            itemCode,
            itemName,
            quantityAtHand,
            ItemQuantity.of(0),
            ItemStatus.ACTIVE);

    }

    public static Item rehydrate(ItemId itemId,
                                 ItemCode itemCode,
                                 String itemName,
                                 ItemQuantity quantityAtHand,
                                 ItemQuantity allocatedQuantity,
                                 ItemStatus status){
        return new Item(
            itemId,
            itemCode,
            itemName,
            quantityAtHand,
            allocatedQuantity,
            status
        );
    }

    public void markAsInactive(){
        if(quantityAtHand.quantity()>0){
            throw new ItemCannotBeInActiveException("Item can not be inactive if it has quantity");
        }
        this.status=ItemStatus.INACTIVE;
    }

    public void updateQuantity(ItemQuantity quantity){
        if(quantity.quantity()<0){
            throw new DomainValidationException("Quantity cannot be negative");
        }

        this.quantityAtHand=Objects.requireNonNull(quantity,"Quantity cannot be null");
    }

    public void itemAllocated(ItemQuantity allocatedQuantity){
        if(allocatedQuantity.quantity()<0){
            throw new DomainValidationException("Quantity cannot be negative");
        }
        this.allocatedQuantity=this.allocatedQuantity.addQuantity(allocatedQuantity.quantity());
    }

    public void itemReturned(ItemQuantity quantity){
        if(quantity.quantity()<0){
            throw new DomainValidationException("Quantity cannot be negative");
        }
       this.allocatedQuantity =this.allocatedQuantity.subtractQuantity(quantity.quantity());
    }

    public void updateItemName(String name){
        this.itemName= Objects.requireNonNull(name,"Item name cannot be null");
    }

    public ItemCode getItemCode() {
        return itemCode;
    }

    public String getItemName() {
        return itemName;
    }

    public ItemQuantity getQuantityAtHand() {
        return quantityAtHand;
    }
    public ItemStatus getStatus() {
        return status;
    }
    public void updateName(String itemName) {
        this.itemName=itemName;
    }

    public ItemQuantity getAllocatedQuantity() {
        return allocatedQuantity;
    }
}
