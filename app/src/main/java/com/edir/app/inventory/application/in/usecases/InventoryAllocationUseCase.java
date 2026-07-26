package com.edir.app.inventory.application.in.usecases;

import com.edir.app.inventory.application.in.commands.AllocateItemCommand;
import com.edir.app.inventory.application.in.commands.TransferCommand;
import com.edir.app.inventory.domain.entity.Allocation;

import java.util.List;
import java.util.UUID;

public interface InventoryAllocationUseCase {

    void allocateItemToMember(AllocateItemCommand allocateItemCommand);
    void increaseAllocationQuantity(AllocateItemCommand allocateItemCommand);
    void reduceAllocationQuantity(AllocateItemCommand allocateItemCommand);
    void transferAllocation(TransferCommand transferCommand);

    List<Allocation> getMemberAllocations(UUID memberId);
    List<Allocation> getItemAllocations(UUID item);

}
