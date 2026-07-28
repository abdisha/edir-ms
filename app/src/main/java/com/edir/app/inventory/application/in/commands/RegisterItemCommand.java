package com.edir.app.inventory.application.in.commands;

import jakarta.validation.constraints.NotNull;

public record RegisterItemCommand(
    @NotNull String itemCode,
    @NotNull String itemName,
    @NotNull Integer initialQuantity
) {
}
