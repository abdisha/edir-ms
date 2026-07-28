package com.edir.app.inventory.application.in.commands;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record UpdateItemCommand(
    @NotNull String itemId,
    @NotNull String itemName,
    @NotNull
    @Min(value = 0,message = "Quantity cannot be negative")
    Integer quantityAtHand
) {
}
