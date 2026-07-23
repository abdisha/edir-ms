package com.edir.app.inventory.application.in.commands;

import java.util.UUID;

public record UpdateItemCommand(
    UUID itemId,
    String itemName
) {
}
