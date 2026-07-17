package com.edir.app.edir.application.ports.in.commands;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.ZonedDateTime;

public record UpInsertEdirCommand(
       @NotNull(message = "Edir name is required")
       @Size(min = 3, max = 50,message = "Edir name cannot be less than 3 or more than 50 characters")
       String edirName,
       @NotNull(message = "Established date is required")
       ZonedDateTime establishedDate,
       @Size(max = 500,message = "Maximum description character count reached")
       String description,
       @NotNull(message = "Address is required")
       Address address,
       @NotNull(message = "Phone number is required")
       @Pattern(
               regexp = "^(09|07)\\d{8}$",
               message = "Invalid phone number"
       )
       String phoneNumber
){}

