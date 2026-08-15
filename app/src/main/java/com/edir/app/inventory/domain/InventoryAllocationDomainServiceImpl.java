package com.edir.app.inventory.domain;

import com.edir.app.inventory.domain.entity.Allocation;
import com.edir.app.inventory.domain.entity.ItemAllocation;
import com.edir.app.inventory.domain.exceptions.InsufficientQuantityException;
import com.edir.app.inventory.domain.valueobjects.ItemId;
import com.edir.app.inventory.domain.valueobjects.ItemQuantity;
import com.edir.app.shared.domain.exceptions.DomainValidationException;

import java.util.List;
import java.util.Optional;

public class InventoryAllocationDomainServiceImpl implements InventoryAllocationDomainService {

    @Override
    public void issue(List<Allocation> allocations, ItemId itemId, ItemQuantity quantity) {
        int requested = quantity.quantity();

        // Calculate the total available quantity at hand
        int available = allocations.stream()
            .mapToInt(allocation ->
                allocation.getItemAllocations().stream()
                    .filter(item -> item.getItemId().equals(itemId))
                    .mapToInt(item -> item.getQuantity().quantity())
                    .sum()
            )
            .sum();

        // Check if the requested quantity is available
        if (requested > available) {
            throw new InsufficientQuantityException(
                itemId,
                ItemQuantity.of(available),
                quantity
            );
        }

        int remaining = requested;

        // Issue items from each allocation until the requested quantity is met
        for (Allocation allocation : allocations) {

            if (remaining == 0) {
                break;
            }

            Optional<ItemAllocation> itemAllocation = allocation.getItemAllocations()
                                        .stream()
                                        .filter(item -> item.getItemId().equals(itemId))
                                        .findFirst();

            if (itemAllocation.isEmpty()) {
                continue;
            }

            int availableInStore = itemAllocation.get().getQuantity().quantity();

            int issueFromStore = Math.min(availableInStore, remaining);

            if (issueFromStore > 0) {
                allocation.issueItems(itemId, ItemQuantity.of(issueFromStore));
                remaining -= issueFromStore;
            }
        }

        if (remaining != 0) {
            throw new DomainValidationException("Unable to issue requested quantity");
        }
    }
}
