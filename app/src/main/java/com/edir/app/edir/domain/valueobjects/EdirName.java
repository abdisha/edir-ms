package com.edir.app.edir.domain.valueobjects;

import java.util.Objects;

public record EdirName(String name) {
    public EdirName {
        Objects.requireNonNull(name, "Edir name cannot be null");
    }
}
