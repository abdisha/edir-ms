package com.edir.app.inventory.application.ports.in.commands;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record IssueItem(
   @NotNull UUID item,
    @NotNull UUID from,
    @Min(value = 1,message = "Quantity must be greater than zero")
    Integer quantity
) {
}
