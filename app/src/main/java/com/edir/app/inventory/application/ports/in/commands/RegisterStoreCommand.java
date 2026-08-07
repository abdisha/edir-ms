package com.edir.app.inventory.application.ports.in.commands;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record RegisterStoreCommand(
    @NotNull
    String name,
    @NotNull
    String location,
    @NotNull
    UUID ownerId
) {
}
