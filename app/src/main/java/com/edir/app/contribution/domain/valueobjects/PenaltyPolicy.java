package com.edir.app.contribution.domain.valueobjects;

import com.edir.app.shared.domain.valueobjects.Money;

import java.math.BigDecimal;
import java.util.Objects;

public record PenaltyPolicy(
        Money amount,
        PenaltyType penaltyType
) {
    public PenaltyPolicy {
        Objects.requireNonNull(amount, "Amount cannot be null");
        Objects.requireNonNull(penaltyType, "Penalty type cannot be null");
        validate();
    }

    public static PenaltyPolicy fixed(Money amount) {
        return new PenaltyPolicy(
                amount,
                PenaltyType.FIXED
        );
    }

    public static PenaltyPolicy percentage(Money amount) {
        return new PenaltyPolicy(
                amount,
                PenaltyType.PERCENTAGE
        );
    }

    public static PenaltyPolicy none() {
        return new PenaltyPolicy(
                Money.zero(),
                PenaltyType.NONE
        );
    }

    public Money calculate(Money outstandingAmount) {
        switch (penaltyType) {
            case FIXED:
                return amount;
            case PERCENTAGE:
                return outstandingAmount
                        .multiply(amount.amount())
                        .divide(BigDecimal.valueOf(100));
            default:
                return Money.zero();
        }

    }

    public boolean isEnabled() {
        return penaltyType != PenaltyType.NONE;
    }

    private void validate() {

        if (penaltyType == PenaltyType.PERCENTAGE) {

            if (amount.amount().compareTo(BigDecimal.ZERO) < 0 ||
                    amount.amount().compareTo(BigDecimal.valueOf(100)) > 0) {

                throw new IllegalArgumentException(
                        "Percentage penalty must be between 0 and 100"
                );
            }
        }
    }

}
