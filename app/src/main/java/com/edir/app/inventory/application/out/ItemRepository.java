package com.edir.app.inventory.application.out;

import com.edir.app.inventory.domain.entity.Item;

import java.util.Optional;
import java.util.UUID;

public interface ItemRepository {
    Item save(Item item);
    Optional<Item> findById(UUID id);
}
