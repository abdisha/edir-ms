package com.edir.app.inventory.adapter.persistance.query;

import com.edir.app.inventory.adapter.persistance.jpa.JpaItemRepository;
import com.edir.app.inventory.application.out.query.ItemQueryRepository;
import com.edir.app.inventory.application.out.query.ItemView;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Component
class ItemQueryRepositoryImpl implements ItemQueryRepository {
   private final JpaItemRepository jpaItemRepository;

    @Override
    public List<ItemView> findAllItems() {
        return jpaItemRepository.findAllItems();
    }

    @Override
    public List<ItemView> findAllUnAllocatedItems() {
        return jpaItemRepository.findAllUnAllocatedItems();
    }

    @Override
    public Optional<ItemView> findItemById(UUID id) {
        return jpaItemRepository.findItemViewById(id);
    }
}
