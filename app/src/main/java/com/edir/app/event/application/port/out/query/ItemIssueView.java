package com.edir.app.event.application.port.out.query;

import java.util.UUID;

public record ItemIssueView(
    UUID id,
    String itemCode,
    String name,
    int quantity
) {
}
