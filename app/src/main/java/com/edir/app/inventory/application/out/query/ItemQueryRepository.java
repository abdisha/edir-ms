package com.edir.app.inventory.application.out.query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ItemQueryRepository {
    List<ItemView> findAllItems();
    List<ItemView> findAllUnAllocatedItems();
    Optional<ItemView> findItemById(UUID id);
}
