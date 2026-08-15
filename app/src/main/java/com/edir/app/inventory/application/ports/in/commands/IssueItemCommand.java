package com.edir.app.inventory.application.ports.in.commands;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.UUID;

public record IssueItemCommand(
    @NotNull UUID funeralId,
    @NotNull UUID issuerId,
    @NotNull UUID item,
    @Min(value = 1,message = "Quantity must be greater than zero")
    Integer quantity
) {
}
