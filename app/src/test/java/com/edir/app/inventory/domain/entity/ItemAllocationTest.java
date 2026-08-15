package com.edir.app.inventory.domain.entity;

import com.edir.app.inventory.domain.exceptions.InsufficientQuantityException;
import com.edir.app.inventory.domain.exceptions.InvalidItemQuantityException;
import com.edir.app.inventory.domain.valueobjects.ItemId;
import com.edir.app.inventory.domain.valueobjects.ItemQuantity;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

class ItemAllocationTest {

    private final ItemId itemId = new ItemId(UUID.randomUUID());

    @Test
    void shouldIssueItemWhenQuantityIsAvailable() {
        ItemAllocation allocation =
            ItemAllocation.create(itemId, ItemQuantity.of(10));

        allocation.issueItem(ItemQuantity.of(4));

        assertThat(allocation.getQuantity().quantity())
            .isEqualTo(6);

        assertThat(allocation.getIssuedQuantity().quantity())
            .isEqualTo(4);
    }

    @Test
    void shouldIssueAllAvailableItems() {
        ItemAllocation allocation =
            ItemAllocation.create(itemId, ItemQuantity.of(10));

        allocation.issueItem(ItemQuantity.of(10));

        assertThat(allocation.getQuantity().quantity())
            .isZero();

        assertThat(allocation.getIssuedQuantity().quantity())
            .isEqualTo(10);
    }

    @Test
    void shouldNotIssueMoreThanAvailableQuantity() {
        ItemAllocation allocation =
            ItemAllocation.create(itemId, ItemQuantity.of(10));

        assertThatThrownBy(() ->
            allocation.issueItem(ItemQuantity.of(11))
        )
            .isInstanceOf(InsufficientQuantityException.class);

        // Important: aggregate wasn't modified
        assertThat(allocation.getQuantity().quantity())
            .isEqualTo(10);

        assertThat(allocation.getIssuedQuantity().quantity())
            .isZero();
    }

    @Test
    void shouldRejectZeroQuantity() {
        ItemAllocation allocation =
            ItemAllocation.create(itemId, ItemQuantity.of(10));

        assertThatThrownBy(() ->
            allocation.issueItem(ItemQuantity.of(0))
        )
            .isInstanceOf(InvalidItemQuantityException.class);
    }

    @Test
    void shouldRejectNegativeQuantity() {
        ItemAllocation allocation =
            ItemAllocation.create(itemId, ItemQuantity.of(10));

        assertThatThrownBy(() ->
            allocation.issueItem(ItemQuantity.of(-1))
        )
            .isInstanceOf(InvalidItemQuantityException.class);
    }
}
