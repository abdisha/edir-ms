package com.edir.app.inventory.application.in.usecases;

import com.edir.app.inventory.application.in.commands.IssueItemCommand;
import com.edir.app.inventory.application.in.commands.ReceiveItemCommand;
import com.edir.app.inventory.application.in.commands.TransferCommand;
import com.edir.app.inventory.domain.entity.Item;

import java.util.UUID;

public interface InventoryMovementUseCase {

    void receiveItem(ReceiveItemCommand receiveItemCommand);
    void transfer(TransferCommand transferCommand);
    void issueItem(IssueItemCommand itemCommand);
    void returnItem(Item item,UUID funeralId);
}
