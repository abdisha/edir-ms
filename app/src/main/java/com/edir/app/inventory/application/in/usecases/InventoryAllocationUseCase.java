package com.edir.app.inventory.application.in.usecases;

import com.edir.app.inventory.application.in.commands.AllocateItemCommand;
import com.edir.app.inventory.application.in.commands.TransferCommand;

public interface InventoryAllocationUseCase {

    void allocateItemToMember(AllocateItemCommand allocateItemCommand);
    void increaseAllocationQuantity(AllocateItemCommand allocateItemCommand);
    void reduceAllocationQuantity(AllocateItemCommand allocateItemCommand);
    void transferAllocation(TransferCommand transferCommand);

}
