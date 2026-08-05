package com.edir.app.inventory.application.ports.in.usecases;

import com.edir.app.inventory.application.ports.in.commands.RegisterItemCommand;
import com.edir.app.inventory.application.ports.in.commands.UpdateItemCommand;
import com.edir.app.inventory.domain.entity.Item;
import com.edir.app.inventory.domain.valueobjects.ItemId;

public interface ItemManagementUseCase {
    Item register(RegisterItemCommand registerItemCommand);
    void updateItem(UpdateItemCommand itemCommand);
    void markAsInActive(ItemId itemId);

}
