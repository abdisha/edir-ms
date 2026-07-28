package com.edir.app.inventory.application.out;

import com.edir.app.inventory.domain.entity.ItemIssue;
import com.edir.app.inventory.domain.valueobjects.ItemIssueId;

import java.util.Optional;

public interface ItemIssueRepository {
    ItemIssueId save(ItemIssue itemIssue);
    Optional<ItemIssue> findById(ItemIssueId itemIssueId);
}
