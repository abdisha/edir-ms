package com.edir.app.contribution.application.commands;

import com.edir.app.contribution.domain.valueobjects.PenaltyType;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

public record CreateContributionCommand(
        String name,
        String description,
        ZonedDateTime startDate,
        ZonedDateTime endDate,
        ZonedDateTime dueDate,
        BigDecimal contributionAmount,
        BigDecimal penaltyAmount,
        PenaltyType penaltyType

) {
}
