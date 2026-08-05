package com.edir.app.inventory.application.ports.out.query;

import java.time.ZonedDateTime;
import java.util.UUID;

public record AllocationView(
    UUID allocationId,
    UUID storeId,
    String storeName,
    UUID storeOwner,
    UUID itemId,
    String itemName,
    String itemCode,
    Integer quantityAtStore,
    Integer issuedQuantity,
    ZonedDateTime receivedDate

) {
}
