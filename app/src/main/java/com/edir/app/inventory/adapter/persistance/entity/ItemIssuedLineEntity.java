package com.edir.app.inventory.adapter.persistance.entity;

import com.edir.app.inventory.domain.valueobjects.ItemIssueStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name = "item_issue_line", schema = "inventory")
public class ItemIssuedLineEntity  {
    @Id
    private UUID id;
    @NotNull
    private UUID itemId;
    private UUID fromId;
    @Enumerated(EnumType.STRING)
    private ItemIssueStatus status;
    private Integer issuedQuantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    @JoinColumn(name = "item_issue_id")
    private ItemIssueEntity itemIssueEntity;

}
