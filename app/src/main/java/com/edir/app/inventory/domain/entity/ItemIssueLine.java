package com.edir.app.inventory.domain.entity;

import com.edir.app.inventory.domain.valueobjects.ItemId;
import com.edir.app.inventory.domain.valueobjects.ItemIssueLineId;
import com.edir.app.inventory.domain.valueobjects.ItemQuantity;
import com.edir.app.shared.domain.entity.BaseEntity;
import com.edir.app.shared.domain.valueobjects.MemberId;

public class ItemIssueLine extends BaseEntity<ItemIssueLineId> {
    private ItemId itemId;
    private MemberId fromId;
    private ItemQuantity issuedQuantity;

    // Private constructor to enforce creation through factory methods
    private ItemIssueLine(ItemIssueLineId itemIssueLineId, MemberId fromId, ItemId itemId, ItemQuantity issuedQuantity) {
        super(itemIssueLineId);
        this.itemId = itemId;
        this.issuedQuantity = issuedQuantity;
        this.fromId = fromId;
    }

    public static ItemIssueLine create(ItemId itemId, MemberId fromId, ItemQuantity issuedQuantity) {

        if (issuedQuantity.quantity() <= 0) {
            throw new IllegalArgumentException("Issued quantity must be positive.");
        }
        return new ItemIssueLine(ItemIssueLineId.generateId(), fromId, itemId, issuedQuantity);
    }

    public static ItemIssueLine rehydrate(ItemIssueLineId itemIssueLineId, MemberId fromId, ItemId itemId, ItemQuantity issuedQuantity) {
        return new ItemIssueLine(itemIssueLineId, fromId,itemId, issuedQuantity);
    }

    public void increaseIssuedQuantity(ItemQuantity quantityToIncrease) {
        if (quantityToIncrease.quantity() <= 0) {
            throw new IllegalArgumentException("Quantity to increase must be positive.");
        }
        this.issuedQuantity = new ItemQuantity(this.issuedQuantity.quantity() + quantityToIncrease.quantity());
    }

    public void decreaseIssuedQuantity(ItemQuantity quantityToDecrease) {
        if (quantityToDecrease.quantity() <= 0) {
            throw new IllegalArgumentException("Quantity to decrease must be positive.");
        }
        if (this.issuedQuantity.quantity() < quantityToDecrease.quantity()) {
            throw new IllegalArgumentException("Cannot decrease quantity below zero.");
        }
        this.issuedQuantity = new ItemQuantity(this.issuedQuantity.quantity() - quantityToDecrease.quantity());
    }

    public MemberId getFromId() {
        return fromId;
    }

    public ItemId getItemId() {
        return itemId;
    }

    public ItemQuantity getIssuedQuantity() {
        return issuedQuantity;
    }
}
