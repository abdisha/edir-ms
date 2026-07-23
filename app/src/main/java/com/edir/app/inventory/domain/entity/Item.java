package com.edir.app.inventory.domain.entity;

import com.edir.app.inventory.domain.valueobjects.ItemStatus;
import com.edir.app.shared.domain.valueobjects.ItemCode;

import java.util.UUID;

public class  Item {
    private UUID itemId;
    private ItemCode itemCode;
    private String itemName;
    private Integer quantityAtHand;
    private ItemStatus status;

    public Item(UUID itemId, ItemCode itemCode, String itemName, Integer quantityAtHand, ItemStatus status) {
        this.itemId = itemId;
        this.itemCode = itemCode;
        this.itemName = itemName;
        this.quantityAtHand = quantityAtHand;
        this.status =status;
    }

    public void updateQuantityAtHand(int quantity){
        quantityAtHand = quantity;
    }

    public void markAsActive(){
        this.status= ItemStatus.ACTIVE;
    }
    public  void inActive(){
        this.status = ItemStatus.ACTIVE;
    }

    public UUID getItemId() {
        return itemId;
    }

    public ItemCode getItemCode() {
        return itemCode;
    }

    public String getItemName() {
        return itemName;
    }

    public Integer getQuantityAtHand() {
        return quantityAtHand;
    }
    public ItemStatus getStatus() {
        return status;
    }

    public void updateName(String itemName) {
        this.itemName=itemName;
    }
}
