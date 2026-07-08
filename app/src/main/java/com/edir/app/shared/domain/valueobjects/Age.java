package com.edir.app.shared.domain.valueobjects;

import java.util.Objects;

public record Age(Integer age) {
    public Age {
        Objects.requireNonNull(age, "Age cannot be null");
        if (age <= 0) {
            throw new IllegalArgumentException("Age must be a positive integer");
        }
        if(age>=120){
            throw new IllegalArgumentException("Age cannot be greater than 120");
        }
    }
}
