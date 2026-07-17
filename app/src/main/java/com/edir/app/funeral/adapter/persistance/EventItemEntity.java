package com.edir.app.funeral.adapter.persistance;

import com.edir.app.funeral.adapter.persistance.converter.EventItemStatusConverter;
import com.edir.app.funeral.domain.valueobjects.EventItemStatus;
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
@Data
@Builder
@Entity
@Table(name = "event_item",schema = "funeral_event")
public class EventItemEntity {
    @Id
    @Column(unique = true)
    @NotNull
    private UUID id;
    @Column(length = 10)
    @NotNull
    private String itemCode;
    private String name;
    @NotNull
    private Integer quantity;
    private Integer returnedQuantity;
    private ZonedDateTime issuedDate;
    @Convert(converter = EventItemStatusConverter.class)
    private EventItemStatus status;
    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.REMOVE)
    @JsonIgnore
    @JoinColumn(name = "funeral_event_id")
    private FuneralEventEntity funeralEvent;
}
