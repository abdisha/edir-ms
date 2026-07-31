package com.edir.app.event.adapter.persistance.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
@Table(name = "meeting_event",schema = "edir_event")
public class MeetingEventEntity {
    @Id
    private UUID id;
    @NotNull
    private String name;
    @NotNull
    private String agenda;
    @NotNull
    private String location;
    @NotNull
    private ZonedDateTime eventDate;
}
