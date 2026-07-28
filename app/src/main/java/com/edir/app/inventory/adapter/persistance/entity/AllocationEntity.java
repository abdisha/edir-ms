package com.edir.app.inventory.adapter.persistance.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Data
@Builder
@Entity
@Table(name = "allocation", schema = "inventory")
@NoArgsConstructor
public class AllocationEntity {
    @Id
    private UUID allocationId;
    @NotNull
    private UUID holderMemberId;
    @OneToMany(mappedBy = "allocation", fetch = FetchType.EAGER,cascade = CascadeType.ALL,orphanRemoval = true)
    private List<ItemAllocationEntity> itemAllocations;

}
