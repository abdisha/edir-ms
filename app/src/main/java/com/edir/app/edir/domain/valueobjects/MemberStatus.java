package com.edir.app.edir.domain.valueobjects;

public enum MemberStatus {
    ACTIVE("active"),INACTIVE("inactive");
    private String value;
    MemberStatus(String value){
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
