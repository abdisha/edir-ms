package com.edir.app.inventory.domain.entity;

import com.edir.app.inventory.domain.exceptions.InsufficientQuantityException;
import com.edir.app.inventory.domain.exceptions.ItemNotAllocatedException;
import com.edir.app.inventory.domain.valueobjects.ItemId;
import com.edir.app.inventory.domain.valueobjects.ItemQuantity;
import com.edir.app.inventory.domain.valueobjects.StoreId;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

class AllocationTest {

    private final StoreId storeId = new StoreId(UUID.randomUUID());

    private final ItemId itemId =
        new ItemId(UUID.randomUUID());

    @Test
    void shouldIssueItemFromAllocation() {

        Allocation allocation =
            Allocation.create(storeId);

        allocation.allocate(itemId, ItemQuantity.of(10));

        allocation.issueItems(itemId, ItemQuantity.of(4));

        ItemAllocation itemAllocation = allocation.getItemAllocations()
            .stream()
            .filter(i -> i.getItemId().equals(itemId))
            .findFirst()
            .orElseThrow();

        assertThat(itemAllocation.getQuantity().quantity())
            .isEqualTo(6);

        assertThat(itemAllocation.getIssuedQuantity().quantity())
            .isEqualTo(4);
    }

    @Test
    void shouldNotIssueMoreThanStoreHas() {

        Allocation allocation = Allocation.create(storeId);

        allocation.allocate(  itemId,  ItemQuantity.of(5));

        assertThatThrownBy(() ->
            allocation.issueItems(
                itemId,
                ItemQuantity.of(6)
            )
        ).isInstanceOf(InsufficientQuantityException.class);
    }

    @Test
    void shouldThrowWhenItemDoesNotExist() {

        Allocation allocation = Allocation.create(storeId);

        assertThatThrownBy(() ->
            allocation.issueItems(
                itemId,
                ItemQuantity.of(5)
            )
        )
            .isInstanceOf(ItemNotAllocatedException.class);
    }
}
