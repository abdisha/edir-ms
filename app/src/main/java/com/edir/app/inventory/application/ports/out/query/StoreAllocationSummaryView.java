package com.edir.app.inventory.application.ports.out.query;

import java.util.UUID;

public record StoreAllocationSummaryView(
    UUID storeId,
    String storeName,
    String location,
    int totalItem
) {
}
