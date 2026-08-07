package com.edir.app.inventory.domain.entity;

import com.edir.app.inventory.domain.valueobjects.*;
import com.edir.app.shared.domain.entity.BaseEntity;
import com.edir.app.shared.domain.exceptions.DomainValidationException;

public class ItemIssueLine extends BaseEntity<ItemIssueLineId> {
    private ItemId itemId;
    private StoreId fromId;
    private ItemIssueStatus status;
    private ItemQuantity issuedQuantity;

    private ItemIssueLine(ItemIssueLineId itemIssueLineId,
                          StoreId fromId,
                          ItemId itemId,
                          ItemIssueStatus status,
                          ItemQuantity issuedQuantity) {
        super(itemIssueLineId);
        this.itemId = itemId;
        this.issuedQuantity = issuedQuantity;
        this.fromId = fromId;
        this.status = status;

    }

    public static ItemIssueLine create(ItemId itemId,
                                       StoreId fromId,
                                       ItemQuantity issuedQuantity) {

        if (issuedQuantity.quantity() <= 0) {
            throw new DomainValidationException("Issued quantity must be positive.");
        }
        return new ItemIssueLine(ItemIssueLineId.generateId(),
            fromId,
            itemId,
            ItemIssueStatus.PENDING,
            issuedQuantity);
    }

    public static ItemIssueLine rehydrate(ItemIssueLineId itemIssueLineId,
                                          StoreId fromId,
                                          ItemId itemId,
                                          ItemIssueStatus status,
                                          ItemQuantity issuedQuantity) {
        return new ItemIssueLine(itemIssueLineId,
            fromId,
            itemId,
            status,
            issuedQuantity);
    }

    public void increaseIssuedQuantity(ItemQuantity quantityToIncrease) {
        if (quantityToIncrease.quantity() <= 0) {
            throw new IllegalArgumentException("Quantity to increase must be positive.");
        }
        this.issuedQuantity = new ItemQuantity(this.issuedQuantity.quantity() + quantityToIncrease.quantity());
    }

    public void approve(){
        this.status = ItemIssueStatus.APPROVED;
    }
    public void rejected(){
        this.status = ItemIssueStatus.REJECTED;
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

    public ItemIssueStatus getStatus(){
        return status;
    }
    public StoreId getFromId() {
        return fromId;
    }

    public ItemId getItemId() {
        return itemId;
    }

    public ItemQuantity getIssuedQuantity() {
        return issuedQuantity;
    }
}
