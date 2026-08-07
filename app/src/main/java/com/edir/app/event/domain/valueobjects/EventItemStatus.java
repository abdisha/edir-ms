package com.edir.app.event.domain.valueobjects;

public enum EventItemStatus {
    ISSUED("ISS"),
    RETURNED("RET");
    private final String value;
    EventItemStatus(String value){
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static EventItemStatus from(String status){
        return switch (status){
            case "ISS" -> EventItemStatus.ISSUED;
            case "RET" -> EventItemStatus.RETURNED;
            default -> throw new IllegalArgumentException("Invalid event item status: " + status);
        };

    }
}
