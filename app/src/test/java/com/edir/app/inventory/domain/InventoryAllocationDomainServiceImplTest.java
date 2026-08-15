package com.edir.app.inventory.domain;

import com.edir.app.inventory.domain.entity.Allocation;
import com.edir.app.inventory.domain.entity.ItemAllocation;
import com.edir.app.inventory.domain.exceptions.InsufficientQuantityException;
import com.edir.app.inventory.domain.exceptions.InvalidItemQuantityException;
import com.edir.app.inventory.domain.valueobjects.ItemId;
import com.edir.app.inventory.domain.valueobjects.ItemQuantity;
import com.edir.app.inventory.domain.valueobjects.StoreId;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

class InventoryAllocationDomainServiceImplTest {

    private final InventoryAllocationDomainService service =
        new InventoryAllocationDomainServiceImpl();

    private final ItemId chair =
        new ItemId(UUID.randomUUID());

    @Test
    void shouldIssueFromSingleStore() {

        Allocation storeA =
            allocation("STORE-A", chair, 10);

        service.issue(
            List.of(storeA),
            chair,
            ItemQuantity.of(6)
        );

        assertAvailable(storeA, chair, 4);
        assertIssued(storeA, chair, 6);
    }

    @Test
    void shouldIssueAcrossMultipleStores() {

        Allocation storeA =
            allocation("STORE-A", chair, 5);

        Allocation storeB =
            allocation("STORE-B", chair, 8);

        Allocation storeC =
            allocation("STORE-C", chair, 3);

        service.issue(
            List.of(storeA, storeB, storeC),
            chair,
            ItemQuantity.of(12)
        );

        // Store A gives 5
        assertAvailable(storeA, chair, 0);
        assertIssued(storeA, chair, 5);

        // Store B gives remaining 7
        assertAvailable(storeB, chair, 1);
        assertIssued(storeB, chair, 7);

        // Store C isn't touched
        assertAvailable(storeC, chair, 3);
        assertIssued(storeC, chair, 0);
    }

    @Test
    void shouldUseAllStoresWhenRequired() {

        Allocation storeA =
            allocation("STORE-A", chair, 5);

        Allocation storeB =
            allocation("STORE-B", chair, 5);

        Allocation storeC =
            allocation("STORE-C", chair, 5);

        service.issue(
            List.of(storeA, storeB, storeC),
            chair,
            ItemQuantity.of(15)
        );

        assertAvailable(storeA, chair, 0);
        assertAvailable(storeB, chair, 0);
        assertAvailable(storeC, chair, 0);

        assertIssued(storeA, chair, 5);
        assertIssued(storeB, chair, 5);
        assertIssued(storeC, chair, 5);
    }

    @Test
    void shouldRejectWhenTotalAvailableQuantityIsInsufficient() {

        Allocation storeA =
            allocation("STORE-A", chair, 5);

        Allocation storeB =
            allocation("STORE-B", chair, 3);

        assertThatThrownBy(() ->
            service.issue(
                List.of(storeA, storeB),
                chair,
                ItemQuantity.of(10)
            )
        ).isInstanceOf(InsufficientQuantityException.class);


        assertAvailable(storeA, chair, 5);
        assertAvailable(storeB, chair, 3);

        assertIssued(storeA, chair, 0);
        assertIssued(storeB, chair, 0);
    }

    @Test
    void shouldIgnoreStoresThatDoNotContainItem() {

        ItemId table =
            new ItemId(UUID.randomUUID());

        Allocation storeA =
            allocation("STORE-A", table, 10);

        Allocation storeB =
            allocation("STORE-B", chair, 5);

        service.issue(
            List.of(storeA, storeB),
            chair,
            ItemQuantity.of(4)
        );

        assertAvailable(storeA, table, 10);

        assertAvailable(storeB, chair, 1);
        assertIssued(storeB, chair, 4);
    }

    @Test
    void shouldRejectZeroQuantity() {

        Allocation store =
            allocation("STORE-A", chair, 10);

        assertThatThrownBy(() ->
            service.issue(
                List.of(store),
                chair,
                ItemQuantity.of(0)
            )
        )
            .isInstanceOf(InvalidItemQuantityException.class);
    }

    private Allocation allocation(
        String store,
        ItemId itemId,
        int quantity
    ) {
        Allocation allocation =
            Allocation.create(
                new StoreId(UUID.randomUUID())
            );

        allocation.allocate(
            itemId,
            ItemQuantity.of(quantity)
        );

        return allocation;
    }

    private void assertAvailable(
        Allocation allocation,
        ItemId itemId,
        int expected
    ) {
        ItemAllocation item =
            findItem(allocation, itemId);

        assertThat(item.getQuantity().quantity())
            .isEqualTo(expected);
    }

    private void assertIssued(
        Allocation allocation,
        ItemId itemId,
        int expected
    ) {
        ItemAllocation item =
            findItem(allocation, itemId);

        assertThat(item.getIssuedQuantity().quantity())
            .isEqualTo(expected);
    }

    private ItemAllocation findItem(
        Allocation allocation,
        ItemId itemId
    ) {
        return allocation.getItemAllocations()
            .stream()
            .filter(i -> i.getItemId().equals(itemId))
            .findFirst()
            .orElseThrow();
    }
}
