package com.edir.app.inventory.application.out.query;

import com.edir.app.inventory.domain.valueobjects.ItemStatus;

import java.util.UUID;

public record ItemView(
    UUID itemId,
    String itemName,
    ItemStatus itemStatus,
    Integer quantity,
    Integer allocated,
    String itemCode) {
}
