package com.edir.app.inventory.adapter.persistance.entity;

import com.edir.app.inventory.adapter.persistance.converter.ItemStatusConverter;
import com.edir.app.inventory.domain.valueobjects.ItemStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name = "item", schema = "inventory")
public class ItemEntity {
    @Id
    private UUID itemId;

    @NotNull
    @Column(length = 100)
    private String itemCode;

    @NotNull
    @Column(length = 100)
    private String name;

    @Convert(converter = ItemStatusConverter.class)
    private ItemStatus status;

    private Integer quantityAtHand;
}
