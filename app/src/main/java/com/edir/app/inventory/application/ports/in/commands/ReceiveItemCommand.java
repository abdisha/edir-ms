package com.edir.app.inventory.application.ports.in.commands;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.time.ZonedDateTime;
import java.util.UUID;

public record ReceiveItemCommand(
    @NotNull
    UUID itemId,
    @Min(value = 1, message = "Quantity must be greater than 0")
    Integer quantity,
    ZonedDateTime receivedDate,
    UUID receiverId
) {
}
