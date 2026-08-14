package com.edir.app.inventory.application.ports.out.query;

import java.time.ZonedDateTime;
import java.util.UUID;

public record IssueView(
    UUID issueId,
    UUID funeralId,
    String funeralName,
    ZonedDateTime issueDate,
    Long itemCount
) {
}
