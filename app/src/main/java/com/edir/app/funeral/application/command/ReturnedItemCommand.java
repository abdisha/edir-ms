package com.edir.app.funeral.application.command;

import jakarta.validation.constraints.NotNull;

public record ReturnedItemCommand(
    @NotNull
    String itemCode,
    @NotNull
    Integer quantity
) {
}
