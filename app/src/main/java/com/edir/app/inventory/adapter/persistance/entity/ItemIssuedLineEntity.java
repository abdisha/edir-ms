package com.edir.app.inventory.adapter.persistance.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "item_issue", schema = "inventory")
public class ItemIssuedLineEntity  {
    @Id
    private UUID id;
    @NotNull
    private UUID itemId;
    @NotNull
    private UUID fromId;

    private int issuedQuantity;

    @ManyToOne()
    @JsonIgnore
    @JoinColumn(name = "item_issue_id", referencedColumnName = "id")
    private ItemIssueEntity itemIssueEntity;

}
