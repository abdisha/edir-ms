package com.edir.app.edir.application.command;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UpInsertEdirCommand(
       @NotNull
       @Size(min = 3, max = 50,message = "Edir name cannot be less than 3 or more than 50 characters")
       String edirName,
       @Size(max = 500,message = "Maximum description character count reached")
       String description,
       @NotNull Address address,
       @NotNull
       @Pattern(
               regexp = "^(09|07)\\d{8}$",
               message = "Invalid phone number"
       )
       String phoneNumber
){}

