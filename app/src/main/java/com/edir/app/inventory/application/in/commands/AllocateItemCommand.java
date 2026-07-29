package com.edir.app.inventory.application.in.commands;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record AllocateItemCommand(
    @NotNull UUID item, @NotNull Integer quantity, @NotNull UUID storeId
) {
}
