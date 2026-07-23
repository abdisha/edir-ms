package com.edir.app.inventory.application.in.commands;

import java.util.UUID;

public record AllocateItemCommand(
    UUID item, Integer quantity, UUID memberId
) {
}
