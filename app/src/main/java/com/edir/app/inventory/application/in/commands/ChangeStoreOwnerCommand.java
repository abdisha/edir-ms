package com.edir.app.inventory.application.in.commands;

import jakarta.validation.constraints.NotNull;

public record ChangeStoreOwnerCommand(
    @NotNull
    String storeId,
    @NotNull
    String memberId
) {
}
