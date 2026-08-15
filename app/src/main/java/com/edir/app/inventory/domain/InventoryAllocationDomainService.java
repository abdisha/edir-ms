package com.edir.app.inventory.domain;

import com.edir.app.inventory.domain.entity.Allocation;
import com.edir.app.inventory.domain.valueobjects.ItemId;
import com.edir.app.inventory.domain.valueobjects.ItemQuantity;

import java.util.List;

public interface InventoryAllocationDomainService {
    void issue(List<Allocation> allocations, ItemId itemId, ItemQuantity quantity);
}
