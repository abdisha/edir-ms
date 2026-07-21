package com.edir.app.edir.application.ports.in.commands;

import jakarta.validation.constraints.*;

public record RegisterMemberCommand(
        @NotNull
        @Size(min = 3, max = 30, message = "First name cannot be less than 3 or more than 30 characters.")
        String firstName,
        @NotNull
        @Size(min = 3, max = 30, message = "Middle name cannot be less than 3 or more than 30 characters.")
        String middleName,
        @NotNull
        @Size(min = 3, max = 30, message = "Last name cannot be less than 3 or more than 30 characters.")
        String lastName,
        @NotNull
        @Min(value = 18, message = "Age cannot be less than 18")
        @Max(value = 110, message = "Age cannot be more than 110")
        Integer age,
        @NotNull
        String gender,
        @NotNull
        Address address,
        @Pattern(
                regexp = "^(\\+251|0)?[97]\\d{8}$",
                message = "Invalid phone number please enter correct number"
        )
        String phoneNumber
) {
}
