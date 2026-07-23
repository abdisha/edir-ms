package com.edir.app.inventory.application.in.commands;

public record RegisterItemCommand(
    String itemCode,
    String itemName
) {
}
