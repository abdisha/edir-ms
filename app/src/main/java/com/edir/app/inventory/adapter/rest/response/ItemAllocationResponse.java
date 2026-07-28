package com.edir.app.inventory.adapter.rest.response;

import java.time.ZonedDateTime;
import java.util.UUID;

public record ItemAllocationResponse(
    UUID itemId,
    String itemName,
    int quantityAtHand,
    int issuedQuantity,
    ZonedDateTime receivedDate
) {
}
