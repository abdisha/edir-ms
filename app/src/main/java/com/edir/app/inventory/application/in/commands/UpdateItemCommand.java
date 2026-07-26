package com.edir.app.inventory.application.in.commands;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record UpdateItemCommand(
    @NotNull UUID itemId,
    @NotNull String itemName
) {
}
