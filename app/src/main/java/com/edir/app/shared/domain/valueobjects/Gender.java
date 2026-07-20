package com.edir.app.shared.domain.valueobjects;

public enum Gender {
    FEMALE("F"),MALE("M");
    private String gender;
    Gender(String gender) {
        this.gender=gender;
    }

    public String getGender() {
        return gender;
    }

    public static Gender from(String gender){
        return switch (gender) {
            case "F" -> FEMALE;
            case "M" -> MALE;
            default -> throw new IllegalArgumentException("Invalid gender: " + gender);
        };
    }
}
