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

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name = "contributions",schema = "contributions")
public class ContributionEntity implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @NotNull
    private UUID id;

    @NotNull
    @Size(max = 100)
    @Column(length = 100)
    private String name;

    @Size(max = 200)
    @Column(length = 200)
    private String description;

    @NotNull
    private ZonedDateTime startDate;

    private ZonedDateTime endDate;

    @NotNull
    private ZonedDateTime dueDate;

    @NotNull
    @Column(precision = 19, scale = 4)
    private BigDecimal contributionAmount;
    @Column(precision = 19, scale = 4)
    private BigDecimal penaltyAmount;

    @NotNull
    @Enumerated(EnumType.STRING)
    private PenaltyType penaltyType;

    @NotNull
    @Enumerated(EnumType.STRING)
    private ContributionStatus status;
}
