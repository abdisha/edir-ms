package com.edir.app.inventory.application.commands;

import java.util.UUID;

public record IssueItem(
    UUID item,
    Integer quantity
) {
}
