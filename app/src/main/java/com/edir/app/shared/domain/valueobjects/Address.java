package com.edir.app.shared.domain.valueobjects;

import java.util.Objects;

public record Address(String city, String subcity, String woreda) {
    public Address {
        Objects.requireNonNull(city, "City cannot be null");
        if (city.trim().isEmpty()) {
            throw new IllegalArgumentException("City cannot be empty");
        }
        Objects.requireNonNull(subcity, "Subcity cannot be null");
        if (subcity.trim().isEmpty()) {
            throw new IllegalArgumentException("Subcity cannot be empty");
        }
        Objects.requireNonNull(woreda, "Woreda cannot be null");
        if (woreda.trim().isEmpty()) {
            throw new IllegalArgumentException("Woreda cannot be empty");
        }
    }
}
