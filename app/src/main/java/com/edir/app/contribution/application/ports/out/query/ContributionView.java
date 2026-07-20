package com.edir.app.contribution.application.ports.out.query;


import com.edir.app.contribution.domain.valueobjects.ContributionStatus;
import com.edir.app.contribution.domain.valueobjects.PenaltyType;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

public record ContributionView(
    UUID id,
    String name,
    String description,
    ZonedDateTime startDate,
    ZonedDateTime endDate,
    ZonedDateTime dueDate,
    BigDecimal penaltyAmount,
    BigDecimal contributionAmount,
    PenaltyType penaltyType,
    ContributionStatus contributionStatus
) {

}
