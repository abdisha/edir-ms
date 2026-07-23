package com.edir.app.inventory.adapter;

import com.edir.app.inventory.adapter.persistance.entity.InventoryAllocationEntity;
import com.edir.app.inventory.adapter.persistance.entity.ItemEntity;
import com.edir.app.inventory.domain.entity.InventoryAllocation;
import com.edir.app.inventory.domain.entity.Item;
import com.edir.app.shared.domain.valueobjects.ItemCode;
import org.springframework.stereotype.Component;

@Component
public class InventoryDataMapper {
    public InventoryAllocation inventoryAllocationEntityToInventoryAllocation(InventoryAllocationEntity entity) {
        return InventoryAllocation.rehydrate(
            entity.getAllocationId(),
            entity.getItemId(),
            entity.getHolderMemberId(),
            entity.getIssuedOutQuantity(),
            entity.getQuantityOnHand()
        );
    }

    public InventoryAllocationEntity inventoryAllocationToInventoryAllocationEntity(InventoryAllocation allocation) {
        return InventoryAllocationEntity.builder()
            .allocationId(allocation.getId())
            .itemId(allocation.getItemId())
            .holderMemberId(allocation.getHolderMemberId())
            .issuedOutQuantity(allocation.getIssuedOutQuantity())
            .quantityOnHand(allocation.getQuantityOnHand())
            .build();
    }

    public ItemEntity itemToItemEntity(Item item){
        return ItemEntity.builder()
            .itemId(item.getItemId())
            .itemCode(item.getItemCode().code())
            .name(item.getItemName())
            .status(item.getStatus())
            .quantityAtHand(item.getQuantityAtHand())
            .build();
    }

    public Item itemEntityToItem(ItemEntity entity){
        return new Item(
            entity.getItemId(),
            new ItemCode(entity.getItemCode()),
            entity.getName(),
            entity.getQuantityAtHand(),
            entity.getStatus()
        );
    }
}
