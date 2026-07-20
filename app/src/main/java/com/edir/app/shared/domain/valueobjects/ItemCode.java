package com.edir.app.shared.domain.valueobjects;

public record ItemCode(String code) {
    public ItemCode {
        if (code == null) {
            throw new IllegalArgumentException("ItemCode cannot be null");
        }
        if (code.isBlank()) {
            throw new IllegalArgumentException("ItemCode cannot be blank");
        }
        if (code.length() > 10) {
            throw new IllegalArgumentException("ItemCode cannot be more than 10 characters");
        }
        if (!code.matches("[A-Z0-9]+")) {
            throw new IllegalArgumentException("ItemCode must contain only uppercase letters and numbers");
        }
    }
}
