package com.edir.app.inventory.application.ports.in.commands;

import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.UUID;

public record IssueItemCommand(
    @NotNull List<IssueItem> issueItems,
    @NotNull UUID funeralId,
    @NotNull UUID issuerId
) {
}
