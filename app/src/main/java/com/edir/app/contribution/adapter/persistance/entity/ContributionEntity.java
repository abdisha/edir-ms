package com.edir.app.contribution.adapter.persistance.entity;

import com.edir.app.contribution.domain.valueobjects.PenaltyType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "contributions")
public class ContributionEntity {
    @Id
    private UUID id;
    @Column(length = 100)
    private String name;
    @Column(length = 200)
    private String description;
    private ZonedDateTime startDate;
    private ZonedDateTime endDate;
    private ZonedDateTime dueDate;
    private BigDecimal contributionAmount;
    @Enumerated(EnumType.STRING)
    private BigDecimal penaltyAmount;
    private PenaltyType penaltyType;
    private Boolean isClosed;
}
