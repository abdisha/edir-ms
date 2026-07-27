package com.edir.app.shared.adapter.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
public abstract class EdirBaseEntity {
    @Id
    private UUID id;
}
