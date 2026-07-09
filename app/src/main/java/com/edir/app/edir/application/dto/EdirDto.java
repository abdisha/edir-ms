package com.edir.app.edir.application.dto;

import jakarta.validation.constraints.*;

public record EdirDto (
       @NotNull
       @Min(value = 3,message = "Minimum name character count reached")
       @Max(value = 50,message = "Maximum name character count reached")
       String edirName,
       @Max(value = 500,message = "Maximum description character count reached")
       String description,
       @NotNull Address address,
       @NotNull
       @Digits(message = "phone number can only be number", integer = 10, fraction = 0)
       String phoneNumber
){}

