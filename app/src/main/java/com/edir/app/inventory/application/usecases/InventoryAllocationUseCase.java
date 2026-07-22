package com.edir.app.inventory.application.usecases;

import com.edir.app.inventory.application.commands.TransferCommand;
import com.edir.app.inventory.domain.entity.InventoryAllocation;

import java.util.List;
import java.util.UUID;

public interface InventoryAllocationUseCase {

    void allocateItemToMember(UUID item,Integer quantity,UUID memberId);
    void increaseAllocationQuantity(UUID item,Integer quantity,UUID memberId);
    void reduceAllocationQuantity(UUID item,Integer quantity,UUID memberId);
    void transferAllocation(TransferCommand transferCommand);

    List<InventoryAllocation> getMemberAllocations(UUID memberId);
    List<InventoryAllocation> getItemAllocations(UUID item);

}
