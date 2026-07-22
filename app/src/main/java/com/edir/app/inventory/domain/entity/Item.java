package com.edir.app.inventory.domain.entity;

import com.edir.app.shared.domain.valueobjects.ItemCode;

import java.util.UUID;

public class  Item {
    private UUID item;
    private ItemCode itemCode;
    private String itemName;
    private Integer quantityAtHand;
    private Boolean isAvailable;

    public Item(UUID item, ItemCode itemCode, String itemName, Integer quantityAtHand, Boolean isAvailable) {
        this.item = item;
        this.itemCode = itemCode;
        this.itemName = itemName;
        this.quantityAtHand = quantityAtHand;
        this.isAvailable = isAvailable;
    }

    public void updateQuantityAtHand(int quantity){
        quantityAtHand =quantity;
    }

    public void markAsActive(){
        this.isAvailable =true;
    }
    public  void inActive(){
        this.isAvailable=false;
    }

    public UUID getItem() {
        return item;
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

    public Boolean getAvailable() {
        return isAvailable;
    }

    public void updateName(String itemName) {
        this.itemName=itemName;
    }
}
