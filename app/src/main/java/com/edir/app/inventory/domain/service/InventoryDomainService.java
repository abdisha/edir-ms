package com.edir.app.inventory.domain.service;

import com.edir.app.inventory.domain.entity.Allocation;
import com.edir.app.inventory.domain.entity.Item;
import com.edir.app.inventory.domain.valueobjects.ItemQuantity;
import com.edir.app.shared.domain.valueobjects.MemberId;

public interface InventoryDomainService {
    void allocateItem(Item item, Allocation allocation);
    void issueItem(Item item);
    void returnItem(Item item, MemberId memberId, ItemQuantity itemQuantity);
    void transferItem(Item item, MemberId fromMemberId, MemberId toMemberId, ItemQuantity itemQuantity);
}
