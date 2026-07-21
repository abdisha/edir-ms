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
        return switch (gender.toUpperCase()) {
            case "F", "FEMALE" -> FEMALE;
            case "M","MALE" -> MALE;
            default -> throw new IllegalArgumentException("Invalid gender: " + gender);
        };
    }
}
