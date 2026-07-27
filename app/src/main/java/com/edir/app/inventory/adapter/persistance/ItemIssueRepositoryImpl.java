package com.edir.app.inventory.adapter.persistance;

import com.edir.app.inventory.adapter.InventoryDataMapper;
import com.edir.app.inventory.adapter.persistance.jpa.JpaItemIssuedRepository;
import com.edir.app.inventory.application.out.ItemIssueRepository;
import com.edir.app.inventory.domain.entity.ItemIssue;
import com.edir.app.inventory.domain.valueobjects.ItemIssueId;
import com.edir.app.shared.adapter.PersistenceAdapter;
import lombok.AllArgsConstructor;

import java.util.Optional;

@AllArgsConstructor
@PersistenceAdapter
class ItemIssueRepositoryImpl implements ItemIssueRepository {
    private final JpaItemIssuedRepository jpaItemIssuedRepository;
    private InventoryDataMapper dataMapper;

    @Override
    public ItemIssueId save(ItemIssue itemIssue) {
        var result = jpaItemIssuedRepository.save(dataMapper.itemIssueToItemIssueEntity(itemIssue));
        return new ItemIssueId(result.getId());
    }

    @Override
    public Optional<ItemIssue> findById(ItemIssueId itemIssueId) {
        return jpaItemIssuedRepository.findById(itemIssueId.id())
            .map(dataMapper::itemIssueEntityToItemIssue);
    }
}
