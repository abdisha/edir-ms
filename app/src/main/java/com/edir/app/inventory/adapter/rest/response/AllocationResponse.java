package com.edir.app.inventory.adapter.rest.response;

import java.time.ZonedDateTime;
import java.util.UUID;

public record AllocationResponse(
    UUID storeId,
    String storeName,
    UUID ownerId,
    String ownerName,
    UUID allocationId,
    UUID itemId,
    String itemName,
    String itemCode,
    Integer quantityAtHand,
    Integer issuedQuantity,
    ZonedDateTime receivedDate

) {

}


