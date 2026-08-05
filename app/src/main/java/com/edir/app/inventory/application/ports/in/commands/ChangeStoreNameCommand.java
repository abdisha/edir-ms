package com.edir.app.inventory.application.ports.in.commands;

import jakarta.validation.constraints.NotNull;

public record ChangeStoreNameCommand(
    @NotNull
    String storeId,
    @NotNull
    String name
) {
}
