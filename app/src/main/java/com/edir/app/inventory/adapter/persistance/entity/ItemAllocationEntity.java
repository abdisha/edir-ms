package com.edir.app.inventory.adapter.persistance.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "item_allocation",schema = "inventory")
public class ItemAllocationEntity {
    @Id
    private UUID id;
    @NotNull
    UUID itemId;
    private int quantityOnHand;
    private int issuedOutQuantity;
    private ZonedDateTime receivedDate;
    private ZonedDateTime issuedDate;

    @ManyToOne()
    @JsonIgnore
    @JoinColumn(name = "allocation_id")
    private AllocationEntity allocation;
}
