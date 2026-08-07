package com.edir.app.inventory.application.ports.in.usecases;

import com.edir.app.inventory.application.ports.in.commands.AllocateItemCommand;
import com.edir.app.inventory.application.ports.in.commands.TransferCommand;

public interface InventoryAllocationUseCase {

    void assignStore(AllocateItemCommand allocateItemCommand);
    void increaseAllocationQuantity(AllocateItemCommand allocateItemCommand);
//    void reduceAllocationQuantity(AllocateItemCommand allocateItemCommand);
    void transferAllocation(TransferCommand transferCommand);


}
