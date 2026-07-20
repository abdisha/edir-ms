package com.edir.app.contribution.application.ports.in.commands;

import com.edir.app.contribution.domain.valueobjects.PenaltyType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

public record CreateContributionCommand(

    String name,
    String description,
    @NotNull
    ZonedDateTime startDate,
    @NotNull
    ZonedDateTime endDate,
    @NotNull
    ZonedDateTime dueDate,
    @Max(100000)
    @Min(10)
    BigDecimal contributionAmount,
    @Max(100000)
    @Min(5)
    BigDecimal penaltyAmount,
    PenaltyType penaltyType

) {
}
