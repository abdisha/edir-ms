package com.edir.app.inventory.application.commands;

public record RegisterItemCommand(
    String itemCode,
    String itemName
) {
}
