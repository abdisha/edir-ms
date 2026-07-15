package com.edir.app.contribution.domain.valueobjects;

import com.edir.app.shared.domain.valueobjects.Money;

public record Settlement(
    Money penaltyPaid,

    Money rolledContributionPaid,

    Money currentContributionPaid,

    Money excess
) {
}
