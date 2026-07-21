package com.edir.app.user.adapter.rest.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class UserRegisterRequestDto {

    @Email(message = "Invalid email format")
    private String email;
    @NotNull(message = "First name is required")
    private String firstName;
    @NotNull(message = "Last name is required")
    private String lastName;
    @NotNull(message = "Password  is required")
    private String password;
}
