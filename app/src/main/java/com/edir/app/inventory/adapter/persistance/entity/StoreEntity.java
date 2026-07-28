package com.edir.app.inventory.adapter.persistance.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "store",schema = "inventory")
public class StoreEntity {
    @Id
    private UUID id;
    @NotNull
    private String name;
    @NotNull
    private String location;
    @NotNull
    private UUID storeOwner;
}
