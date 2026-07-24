package com.edir.app.inventory.domain.valueobjects;

import org.springframework.util.StringUtils;

public enum ItemStatus {
    DAMAGED("DA"), ACTIVE("AC"), INACTIVE("INC");
    private String value;

    ItemStatus(String value) {
        if (value == null || StringUtils.containsWhitespace(value)) {
            throw new IllegalArgumentException("Empty Status t");
        }
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static ItemStatus from(String value) {
        return switch (value.toUpperCase()) {
            case "DAMAGED",  "DA" -> DAMAGED;
            case "ACTIVE","AC" -> ACTIVE;
            case "INACTIVE","INC" -> INACTIVE;
            default -> throw new IllegalArgumentException("Invalid item status type: "+value);
        };
    }
}
