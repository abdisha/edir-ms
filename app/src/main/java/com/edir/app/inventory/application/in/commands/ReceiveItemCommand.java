package com.edir.app.inventory.application.in.commands;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.time.ZonedDateTime;
import java.util.UUID;

public record ReceiveItemCommand(
    @NotNull
    UUID itemId,
    @Min(1)
    Integer quantity,
    ZonedDateTime receivedDate,
    UUID receiverId
) {
}
