package com.edir.app.inventory.application.services;

import com.edir.app.inventory.application.exceptions.ItemNotFoundException;
import com.edir.app.inventory.application.in.commands.RegisterItemCommand;
import com.edir.app.inventory.application.in.commands.UpdateItemCommand;
import com.edir.app.inventory.application.in.usecases.InventoryManagementUseCase;
import com.edir.app.inventory.application.out.ItemRepository;
import com.edir.app.inventory.domain.entity.Item;
import com.edir.app.inventory.domain.valueobjects.ItemStatus;
import com.edir.app.shared.application.usecase.UseCase;
import com.edir.app.shared.domain.valueobjects.ItemCode;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Transactional
@UseCase
class InventoryManagementService implements InventoryManagementUseCase {
    private final ItemRepository repository;


    @Override
    public Item register(RegisterItemCommand command) {
         Item item = new Item(
             UUID.randomUUID(),
             new ItemCode(command.itemCode()),
             command.itemName(),
             0,
             ItemStatus.ACTIVE
         );
        return repository.save(item) ;
    }

    @Override
    public void updateItem(UpdateItemCommand command) {
        Optional<Item> result = repository.findById(command.itemId());
        if (result.isEmpty()) {
            throw new ItemNotFoundException("Item not found");
        }
        Item item = result.get();
        item.updateName(command.itemName());
        repository.save(item);
    }
}
