package com.edir.app.funeral.adapter.persistance.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name = "funeral_event",schema = "funeral_event")
public class FuneralEventEntity {
    @Id
    @Column(unique = true)
    private UUID funeralEventId;
    @Column(length = 100)
    private String name;
    private ZonedDateTime funeralDate;
    @NotNull
    private UUID mournerId;
    @NotNull
    @Column(precision = 19, scale = 4)
    private BigDecimal payOut;
    private ZonedDateTime payOutDate;
    private Boolean isClosed;
    @OneToMany(mappedBy = "funeralEvent",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<EventItemEntity> itemEntities = new ArrayList<>();
}
