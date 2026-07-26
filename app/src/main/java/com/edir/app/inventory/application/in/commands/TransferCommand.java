package com.edir.app.inventory.application.in.commands;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record TransferCommand(
    @NotNull
    UUID itemId,
    @NotNull  UUID from ,
    @NotNull UUID to,
    @NotNull
    @Min(value = 1,message ="Quantity must be greater than 0" )
    Integer quantity
) {
}
