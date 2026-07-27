package com.edir.app.inventory.application.services;

import com.edir.app.inventory.application.exceptions.ItemNotFoundException;
import com.edir.app.inventory.application.in.commands.RegisterItemCommand;
import com.edir.app.inventory.application.in.commands.UpdateItemCommand;
import com.edir.app.inventory.application.in.usecases.ItemManagementUseCase;
import com.edir.app.inventory.application.out.ItemRepository;
import com.edir.app.inventory.domain.entity.Item;
import com.edir.app.inventory.domain.valueobjects.ItemId;
import com.edir.app.shared.application.usecase.UseCase;
import com.edir.app.shared.domain.valueobjects.ItemCode;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

import java.util.Optional;

@AllArgsConstructor
@Transactional
@UseCase
class ItemManagementService implements ItemManagementUseCase {
    private final ItemRepository repository;


    @Override
    public Item register(RegisterItemCommand command) {
         Item item = Item.registerItem(
             new ItemCode(command.itemCode()),
             command.itemName()
         );
        return repository.save(item) ;
    }

    @Override
    public void updateItem(UpdateItemCommand command) {
        Optional<Item> result = repository.findById(new ItemId(command.itemId()));
        if (result.isEmpty()) {
            throw new ItemNotFoundException("Item not found");
        }

        Item item = result.get();
        item.updateName(command.itemName());
        repository.save(item);
    }

    @Override
    public void markAsInActive(ItemId itemId) {
        var item = repository.findById(itemId);
        if(item.isEmpty()){
            throw new ItemNotFoundException("Not item found with item id: "+itemId);
        }
        item.get().markAsInactive();
        repository.save(item.get());
    }
}
