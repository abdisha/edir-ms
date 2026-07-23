package com.edir.app.inventory.domain.valueobjects;

import org.springframework.util.StringUtils;

public enum ItemStatus {
    DAMAGED("DA"), ACTIVE("AC"), INACTIVE("INC");
    private String value;

    ItemStatus(String value) {
        if (value == null || StringUtils.containsWhitespace(value)) {
            throw new IllegalArgumentException("Empty Status t");
        }
    }

    public String getValue() {
        return value;
    }

    public static ItemStatus from(String value) {
        return switch (value.toUpperCase()) {
            case "DA" -> DAMAGED;
            case "AC" -> ACTIVE;
            case "INC" -> INACTIVE;
            default -> throw new IllegalArgumentException("Invalid item status type: "+value);
        };
    }
}
