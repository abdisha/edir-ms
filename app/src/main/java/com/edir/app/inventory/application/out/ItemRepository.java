package com.edir.app.inventory.application.out;

import com.edir.app.inventory.domain.entity.Item;

import java.util.UUID;

public interface ItemRepository {
    Item save(Item item);
    Item findById(UUID id);
}
