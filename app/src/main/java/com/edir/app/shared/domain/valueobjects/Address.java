package com.edir.app.shared.domain.valueobjects;

import java.util.Objects;

public record Address(String city,String subCity,String worda) {
    public Address {
        Objects.requireNonNull(city, "City cannot be null");
        if (city.trim().isEmpty()) {
            throw new IllegalArgumentException("City cannot be empty");
        }
        Objects.requireNonNull(subCity, "Sub-city cannot be null");
        if (subCity.trim().isEmpty()) {
            throw new IllegalArgumentException("Sub-city cannot be empty");
        }
        Objects.requireNonNull(worda, "Woreda cannot be null");
        if (worda.trim().isEmpty()) {
            throw new IllegalArgumentException("Woreda cannot be empty");
        }
    }
}
