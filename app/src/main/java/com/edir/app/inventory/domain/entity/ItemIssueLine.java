package com.edir.app.inventory.domain.entity;

import com.edir.app.inventory.domain.valueobjects.*;
import com.edir.app.shared.domain.entity.BaseEntity;
import com.edir.app.shared.domain.exceptions.DomainValidationException;

public class ItemIssueLine extends BaseEntity<ItemIssueLineId> {
    private ItemId itemId;
    private StoreId fromId;
    private ItemIssueStatus status;
    private ItemQuantity issuedQuantity;
    private ItemQuantity approvedQuantity;

    private ItemIssueLine(ItemIssueLineId itemIssueLineId,
                          StoreId fromId,
                          ItemId itemId,
                          ItemIssueStatus status,
                          ItemQuantity issuedQuantity,
                          ItemQuantity approvedQuantity) {
        super(itemIssueLineId);
        this.itemId = itemId;
        this.issuedQuantity = issuedQuantity;
        this.approvedQuantity = approvedQuantity;
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
            issuedQuantity,
            ItemQuantity.of(0)
        );
    }

    public static ItemIssueLine rehydrate(ItemIssueLineId itemIssueLineId,
                                          StoreId fromId,
                                          ItemId itemId,
                                          ItemIssueStatus status,
                                          ItemQuantity issuedQuantity,
                                          ItemQuantity approvedQuantity
                                          ) {
        return new ItemIssueLine(itemIssueLineId,
            fromId,
            itemId,
            status,
            issuedQuantity,
            approvedQuantity);
    }

    public void increaseIssuedQuantity(ItemQuantity quantityToIncrease) {
        if (quantityToIncrease.quantity() <= 0) {
            throw new IllegalArgumentException("Quantity to increase must be positive.");
        }
        this.issuedQuantity = new ItemQuantity(this.issuedQuantity.quantity() + quantityToIncrease.quantity());
    }

    public void approve(ItemQuantity quantityToApprove){
        if(quantityToApprove.quantity() <= 0){
            throw new DomainValidationException("Quantity to approve must be positive.");
        }
        if(this.issuedQuantity.quantity() < quantityToApprove.quantity()){
            throw new DomainValidationException("Cannot approve more than issued quantity.");
        }

        this.approvedQuantity = new ItemQuantity(this.approvedQuantity.quantity() + quantityToApprove.quantity());
        this.status = ItemIssueStatus.APPROVED;

    }

    public void rejected(){
        this.status = ItemIssueStatus.REJECTED;
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

    public ItemQuantity getApprovedQuantity(){
        return approvedQuantity;
    }

    public ItemQuantity getIssuedQuantity() {
        return issuedQuantity;
    }
}
