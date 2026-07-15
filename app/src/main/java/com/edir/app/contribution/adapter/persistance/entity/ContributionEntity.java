package com.edir.app.contribution.adapter.persistance.entity;

import com.edir.app.contribution.domain.valueobjects.ContributionStatus;
import com.edir.app.contribution.domain.valueobjects.PenaltyType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name = "contributions",schema = "contributions")
public class ContributionEntity {

    private static final long serialVersionUID = 1L; // Added serialVersionUID

    @Id
    @NotNull // ID should always be present
    private UUID id;

    @NotNull // Name should not be null
    @Size(max = 100) // Explicit size constraint
    @Column(length = 100)
    private String name;

    @Size(max = 200) // Explicit size constraint
    @Column(length = 200)
    private String description; // Description can be null

    @NotNull // Start date should not be null
    private ZonedDateTime startDate;

    private ZonedDateTime endDate; // End date can be null

    @NotNull // Due date should not be null
    private ZonedDateTime dueDate;

    @NotNull
    @Column(precision = 19, scale = 4) // Contribution amount should not be null
    private BigDecimal contributionAmount;
    @Column(precision = 19, scale = 4)
    private BigDecimal penaltyAmount; // Penalty amount can be null

    @NotNull // Penalty type should not be null
    @Enumerated(EnumType.STRING)
    private PenaltyType penaltyType;

    @NotNull // Status should not be null
    @Enumerated(EnumType.STRING)
    private ContributionStatus status;
}
