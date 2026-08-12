package com.edir.app.inventory.application.ports.out;

import com.edir.app.inventory.domain.entity.ItemIssue;
import com.edir.app.inventory.domain.valueobjects.ItemIssueId;

import java.util.Optional;
import java.util.UUID;

public interface ItemIssueRepository {
    ItemIssueId save(ItemIssue itemIssue);
    Optional<ItemIssue> findByFuneralId(UUID funeralId);
    Optional<ItemIssue> findById(ItemIssueId itemIssueId);
}
