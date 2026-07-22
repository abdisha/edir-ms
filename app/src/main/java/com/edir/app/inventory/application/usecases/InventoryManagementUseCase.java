package com.edir.app.inventory.application.usecases;

import com.edir.app.inventory.application.commands.RegisterItemCommand;
import com.edir.app.inventory.domain.entity.Item;

import java.util.UUID;

public interface InventoryManagementUseCase {
    Item register(RegisterItemCommand registerItemCommand);

    void updateItem(UUID itemId, String itemName);

}
