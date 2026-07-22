package com.edir.app.inventory.domain.entity;

import java.util.UUID;

public class ItemIssueLine {
    private UUID itemIssueId;
    private UUID itemId;
    private int quantity;

    public ItemIssueLine(UUID itemIssueId, UUID itemId, int quantity) {
        this.itemIssueId = itemIssueId;
        this.itemId = itemId;
        this.quantity = quantity;
    }

    public UUID getItemIssueId() {
        return itemIssueId;
    }

    public UUID getItemId() {
        return itemId;
    }

    public int getQuantity() {
        return quantity;
    }
}
