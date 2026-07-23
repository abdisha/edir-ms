package com.edir.app.inventory.adapter.persistance.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@AllArgsConstructor
@Data
@Builder
@Entity
@Table(name = "inventory_allocation", schema = "inventory")
public class InventoryAllocationEntity {
    @Id
    private UUID allocationId;

    @NotNull
    UUID itemId;
    @NotNull
    private UUID holderMemberId;

    private int quantityOnHand;

    private int issuedOutQuantity;

}
