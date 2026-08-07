package com.edir.app.inventory.adapter.persistance.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name ="item_issue",schema = "inventory")
public class ItemIssueEntity {
    @Id
    private UUID id;
    @NotNull
    private UUID funeralId;
    @NotNull
    private UUID issuerId;
    @NotNull
    private ZonedDateTime issuedDate;

    @OneToMany(mappedBy = "itemIssueEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemIssuedLineEntity> issuedLineEntities = new ArrayList<>();

}
