package com.edir.app.inventory.application.out;

import com.edir.app.inventory.domain.entity.Item;
import com.edir.app.inventory.domain.valueobjects.ItemId;

import java.util.Optional;

public interface ItemRepository {
    Item save(Item item);
    Optional<Item> findById(ItemId id);
}
