package com.edir.app.edir.application.edir.command;

import jakarta.validation.constraints.*;

public record RegisterEdirCommand(
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

