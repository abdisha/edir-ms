package com.edir.app.inventory.adapter;

import com.edir.app.inventory.adapter.persistance.entity.*;
import com.edir.app.inventory.adapter.rest.response.ItemAllocationResponse;
import com.edir.app.inventory.application.out.query.AllocationItemView;
import com.edir.app.inventory.domain.entity.*;
import com.edir.app.inventory.domain.valueobjects.*;
import com.edir.app.shared.domain.valueobjects.ItemCode;
import com.edir.app.shared.domain.valueobjects.MemberId;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class InventoryDataMapper {
    public Allocation inventoryAllocationEntityToInventoryAllocation(AllocationEntity entity) {
        return Allocation.rehydrate(
            new AllocationId(entity.getAllocationId()),
            new MemberId(entity.getHolderMemberId()),
            toItemAllocation(entity.getItemAllocations())
        );
    }

    private List<ItemAllocation> toItemAllocation(List<ItemAllocationEntity> itemAllocations) {
        return itemAllocations.stream().map(
            i->ItemAllocation.rehydrate(
                new ItemAllocationId(i.getId()),
                new ItemId(i.getItemId()),
                new ItemQuantity(i.getQuantityOnHand()),
                new ItemQuantity(i.getIssuedOutQuantity()),
                i.getReceivedDate(),
                i.getIssuedDate()
            )
        ).toList();
    }

    public AllocationEntity inventoryAllocationToInventoryAllocationEntity(Allocation allocation) {
        return AllocationEntity.builder()
            .allocationId(allocation.getId().id())
            .holderMemberId(allocation.getHolderMemberId().value())
            .itemAllocations(toItemAllocationEntity(allocation.getItemAllocations()))
            .build();
    }

    private List<ItemAllocationEntity> toItemAllocationEntity(List<ItemAllocation> itemAllocations) {
        return itemAllocations.stream().map(
            i->ItemAllocationEntity.builder()
                .id(i.getId().id())
                .itemId(i.getItemId().id())
                .quantityOnHand(i.getQuantity().quantity())
                .issuedOutQuantity(i.getIssuedQuantity().quantity())
                .receivedDate(i.getReceivedDate())
                .issuedDate(i.getIssuedDate()).build()
        ).toList();
    }

    public ItemEntity itemToItemEntity(Item item){
        return ItemEntity.builder()
            .id(item.getId().id())
            .itemCode(item.getItemCode().code())
            .name(item.getItemName())
            .status(item.getStatus())
            .quantityAtHand(item.getQuantityAtHand().quantity())
            .build();
    }

    public Item itemEntityToItem(ItemEntity entity){
        return Item.rehydrate(
            new ItemId(entity.getId()),
            new ItemCode(entity.getItemCode()),
            entity.getName(),
            new ItemQuantity(entity.getQuantityAtHand()),
            entity.getStatus()
        );
    }

    public ItemAllocationResponse allocationItemViewToItemAllocationResponse(AllocationItemView allocationItemView) {
        return new ItemAllocationResponse(
            allocationItemView.itemId(),
            allocationItemView.itemName(),
            allocationItemView.quantityAtHand(),
            allocationItemView.issuedQuantity(),
            allocationItemView.receivedDate()
        );
    }

    public ItemIssue itemIssueEntityToItemIssue(ItemIssueEntity itemIssue){
        return ItemIssue.rehydrate(
            new ItemIssueId(itemIssue.getId()),
            itemIssue.getFuneralId(),
            itemIssue.getIssuedDate(),
            new MemberId(itemIssue.getIssuerId()),
            itemIssue.getIssuedLineEntities().stream().map(
                i->ItemIssueLine.rehydrate(
                    new ItemIssueLineId(i.getId()),
                    new MemberId(i.getFromId()),
                    new ItemId(i.getItemId()),
                    new ItemQuantity(i.getIssuedQuantity())
                )
            ).toList()

        );
    }

    public ItemIssueEntity itemIssueToItemIssueEntity(ItemIssue itemIssue){
        return ItemIssueEntity.builder()
            .id(itemIssue.getId().id())
            .funeralId(itemIssue.getFuneralId())
            .issuedDate(itemIssue.getIssuedDate())
            .issuedLineEntities(itemIssue.getItemIssueLines().stream().map(
                i-> ItemIssuedLineEntity.builder()
                    .id(i.getId().id())
                    .fromId(i.getFromId().value())
                    .issuedQuantity(i.getIssuedQuantity().quantity())
                    .itemId(i.getItemId().id()).build()
            ).toList())
            .issuerId(itemIssue.getIssuerId().value())
            .build();

    }
}
