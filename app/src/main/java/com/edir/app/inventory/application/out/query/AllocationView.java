package com.edir.app.inventory.application.out.query;

import java.util.UUID;

public record AllocationView(
    UUID allocationId,
    UUID memberId
) {
}
