package com.edir.app.shared.domain.valueobjects;

import com.edir.app.shared.domain.exceptions.DomainException;

import java.math.BigDecimal;
import java.util.Objects;

public record Money(BigDecimal amount) {

    public Money {
        Objects.requireNonNull(amount, "Amount cannot be null");
        if (amount.compareTo(BigDecimal.ZERO) < 0) {
            throw new DomainException("Money amount cannot be negative.");
        }
    }

    public Money add(Money other) {
        return new Money(amount.add(other.amount));
    }

    public Money subtract(Money other) {
        BigDecimal result = amount.subtract(other.amount);

        if (result.compareTo(BigDecimal.ZERO) < 0) {
            throw new DomainException("Money amount cannot be negative.");
        }

        return new Money(result);
    }

    public Money multiply(BigDecimal quantity) {
        return new Money(amount.multiply(quantity));
    }

    public Money divide(BigDecimal quantity){
        return new Money(amount.divide(quantity));
    }

    public boolean isGreaterThan(Money other) {
        return amount.compareTo(other.amount) > 0;
    }

    public boolean isZero() {
        return amount.compareTo(BigDecimal.ZERO) == 0;
    }

    public static Money zero() {
        return new Money(BigDecimal.ZERO);
    }
}
