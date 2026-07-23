package com.edir.app.inventory.application.in.commands;

import com.edir.app.inventory.domain.entity.Item;

import java.util.UUID;

public record TransferCommand(
    Item item,
    UUID from ,
    UUID to,
    Integer quantity
) {
}
