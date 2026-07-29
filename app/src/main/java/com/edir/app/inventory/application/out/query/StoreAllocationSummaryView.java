package com.edir.app.inventory.application.out.query;

import java.util.UUID;

public record StoreAllocationSummaryView(
    UUID storeId,
    String storeName,
    String location,
    int totalItem
) {
}
