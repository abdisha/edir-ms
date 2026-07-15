package com.edir.app.contribution.domain.valueobjects;

public enum PenaltyType {
    FIXED("F"),PERCENTAGE("P")
    ;

    private final String value;

    PenaltyType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
