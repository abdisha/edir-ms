package com.edir.app.shared.domain.valueobjects;

import java.util.Objects;

public record PhoneNumber(String phoneNumber) {
    public PhoneNumber {
        Objects.requireNonNull(phoneNumber, "Phone number cannot be null");
        if (phoneNumber.trim().isEmpty()) {
            throw new IllegalArgumentException("Phone number cannot be empty");
        }

        // Basic validation for phone number format (e.g., digits and optional + at the beginning)
        if (!phoneNumber.matches("^\\+?[0-9]{7,15}$")) { // Adjust regex as needed for specific phone number formats
            throw new IllegalArgumentException("Invalid phone number format");
        }
    }
}
