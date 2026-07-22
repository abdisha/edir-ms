package com.edir.app.inventory.application.services;

import com.edir.app.inventory.application.commands.RegisterItemCommand;
import com.edir.app.inventory.application.out.ItemRepository;
import com.edir.app.inventory.application.usecases.InventoryManagementUseCase;
import com.edir.app.inventory.domain.entity.Item;
import com.edir.app.shared.domain.valueobjects.ItemCode;

import java.util.UUID;

public class InventoryManagementService implements InventoryManagementUseCase {
    private final ItemRepository repository;

    public InventoryManagementService(ItemRepository repository) {
        this.repository = repository;
    }

    @Override
    public Item register(RegisterItemCommand command) {
         Item item = new Item(
             UUID.randomUUID(),
             new ItemCode(command.itemCode()),
             command.itemName(),
             0,
             true
         );
        return repository.save(item) ;
    }

    @Override
    public void updateItem(UUID id, String itemName) {
        Item item = repository.findById(id);
        item.updateName(itemName);
    }
}
