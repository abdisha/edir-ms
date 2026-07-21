package com.edir.app.shared.domain.valueobjects;

import java.util.Objects;

public record FullName(String firstName,String middle, String lastName) {
    public FullName {
        Objects.requireNonNull(firstName, "First name cannot be null");
        if (firstName.trim().isEmpty()) {
            throw new IllegalArgumentException("First name cannot be empty");
        }
        Objects.requireNonNull(middle, "Middle name cannot be null");
        if (middle.trim().isEmpty()) {
            throw new IllegalArgumentException("Middle name cannot be empty");
        }
        Objects.requireNonNull(lastName, "Last name cannot be null");
        if (lastName.trim().isEmpty()) {
            throw new IllegalArgumentException("Last name cannot be empty");
        }
    }

    @Override
    public String toString() {
        return firstName + " " + middle + " " + lastName;
    }
}
