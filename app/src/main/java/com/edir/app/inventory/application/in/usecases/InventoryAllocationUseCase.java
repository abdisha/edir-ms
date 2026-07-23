package com.edir.app.inventory.application.in.usecases;

import com.edir.app.inventory.application.in.commands.AllocateItemCommand;
import com.edir.app.inventory.application.in.commands.TransferCommand;
import com.edir.app.inventory.domain.entity.InventoryAllocation;

import java.util.List;
import java.util.UUID;

public interface InventoryAllocationUseCase {

    void allocateItemToMember(AllocateItemCommand allocateItemCommand);
    void increaseAllocationQuantity(AllocateItemCommand allocateItemCommand);
    void reduceAllocationQuantity(AllocateItemCommand allocateItemCommand);
    void transferAllocation(TransferCommand transferCommand);

    List<InventoryAllocation> getMemberAllocations(UUID memberId);
    List<InventoryAllocation> getItemAllocations(UUID item);

}
