package com.edir.app.inventory.application.ports.out.query;

import com.edir.app.inventory.domain.valueobjects.ItemIssueStatus;

import java.util.UUID;

public record  IssueItemView(
    UUID issueId,
    UUID itemId,
    String itemName,
    String itemCode,
    Integer quantity,
    UUID fromId,
    String store,
    ItemIssueStatus status
) {
}
