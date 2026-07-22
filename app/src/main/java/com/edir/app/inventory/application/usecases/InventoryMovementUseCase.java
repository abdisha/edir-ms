package com.edir.app.inventory.application.usecases;

import com.edir.app.inventory.application.commands.IssueItemCommand;
import com.edir.app.inventory.application.commands.ReceiveItemCommand;
import com.edir.app.inventory.application.commands.TransferCommand;
import com.edir.app.inventory.domain.entity.Item;

import java.util.UUID;

public interface InventoryMovementUseCase {

    void receiveItem(ReceiveItemCommand receiveItemCommand);
    void transfer(TransferCommand transferCommand);
    void issueItem(IssueItemCommand itemCommand);
    void returnItem(Item item,UUID funeralId);
}
