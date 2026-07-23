package com.edir.app.inventory.adapter.persistance;

import com.edir.app.inventory.adapter.InventoryDataMapper;
import com.edir.app.inventory.adapter.persistance.jpa.JpaItemRepository;
import com.edir.app.inventory.application.out.ItemRepository;
import com.edir.app.inventory.domain.entity.Item;
import com.edir.app.shared.adapter.PersistenceAdapter;
import lombok.AllArgsConstructor;

import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@PersistenceAdapter
class InventoryItemRepositoryImpl implements ItemRepository {
    private final JpaItemRepository itemRepository;
    private final InventoryDataMapper mapper;

    @Override
    public Item save(Item item) {
        return mapper.itemEntityToItem(
                    itemRepository.save(
                        mapper.itemToItemEntity(item)));
    }

    @Override
    public Optional<Item> findById(UUID id) {
        return itemRepository.findById(id)
            .map(mapper::itemEntityToItem);
    }
}
