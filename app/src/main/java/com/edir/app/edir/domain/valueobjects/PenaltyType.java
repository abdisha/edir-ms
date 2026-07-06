package com.edir.app.edir.domain.valueobjects;

public enum PenaltyType {
    FIXED("fixed"),PERCENT("percentage");
    private String value;
    PenaltyType(String value){
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
