package com.edir.app.funeral.application.port.in.command;

import jakarta.validation.constraints.NotNull;

public record ReturnedItemCommand(
    @NotNull
    String itemCode,
    @NotNull
    Integer quantity
) {
}
