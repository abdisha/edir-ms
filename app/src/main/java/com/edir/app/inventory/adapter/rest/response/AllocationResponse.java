package com.edir.app.inventory.adapter.rest.response;

import java.util.UUID;

public record AllocationResponse(
UUID memberId,
UUID itemId,
int quantity
) {

}
