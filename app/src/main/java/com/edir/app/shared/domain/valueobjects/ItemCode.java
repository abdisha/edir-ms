package com.edir.app.shared.domain.valueobjects;

import com.edir.app.shared.domain.exceptions.DomainValidationException;

public record ItemCode(String code) {
    public ItemCode {
        if (code == null) {
            throw new DomainValidationException("ItemCode cannot be null");
        }
        if (code.isBlank()) {
            throw new DomainValidationException("ItemCode cannot be blank");
        }
        if (code.length() > 10) {
            throw new DomainValidationException("ItemCode cannot be more than 10 characters");
        }
        if (!code.matches("[A-Z0-9]+")) {
            throw new DomainValidationException("ItemCode must contain only uppercase letters and numbers");
        }
    }
}
