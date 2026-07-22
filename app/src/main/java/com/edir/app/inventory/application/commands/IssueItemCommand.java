package com.edir.app.inventory.application.commands;

import java.util.List;
import java.util.UUID;

public record IssueItemCommand(
   List<IssueItem> issueItems,
    UUID funeralId,
    UUID issuerId

) {
}
