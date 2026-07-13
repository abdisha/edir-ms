package com.edir.app.edir.application.edir.command;

import com.edir.app.shared.domain.valueobjects.Gender;
import com.edir.app.shared.domain.valueobjects.PhoneNumber;
import jakarta.validation.constraints.*;

public record RegisterMemberCommand(
        @NotNull
        @Size(min = 4, max = 30, message = "First name cannot be less than 4 or more than 30 characters")
        String firstName,
        @NotNull
        @Size(min = 4, max = 30, message = "Middle name cannot be less than 4 or more than 30 characters")
        String middleName,
        @NotNull
        @Size(min = 4, max = 30, message = "Last name cannot be less than 4 or more than 30 characters")
        String lastName,
        @NotNull
        @Min(value = 18, message = "Age cannot be less than 18")
        @Max(value = 100, message = "Age cannot be more than 100")
        Integer age,
        @NotNull
        String gender,
        @NotNull
        Address address,
        @NotNull
        @Pattern(
                regexp = "^(09|07)\\d{8}$",
                message = "Invalid phone number"
        )
        String phoneNumber
) {
}
