package com.edir.app.inventory.adapter.rest.response;

import java.util.UUID;

public record AllocationResponse(
    UUID memberId,
    String memberName,
    UUID allocationId
) {

}
