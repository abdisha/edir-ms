package com.edir.app.inventory.application.ports.out.query;

import java.time.ZonedDateTime;
import java.util.UUID;

public record AllocationItemView(
    UUID itemId,
    String itemName,
    Integer quantityAtHand,
    Integer issuedQuantity,
    ZonedDateTime receivedDate
) {
}
