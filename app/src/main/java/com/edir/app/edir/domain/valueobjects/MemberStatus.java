package com.edir.app.edir.domain.valueobjects;

public enum MemberStatus {
    ACTIVE("AC"),INACTIVE("INAC");
    private String value;
    MemberStatus(String value){
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static MemberStatus from(String s) {
        return switch (s){
            case "AC" -> ACTIVE;
            case "INAC" -> INACTIVE;
            default -> throw new IllegalArgumentException("Invalid member status: " + s);
        };
    }
}
