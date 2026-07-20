package com.edir.app.user.adapter.rest.dto;

import com.edir.app.user.domain.User;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

public class UserResponseDto {
    private UUID id;
    private String email;
    private Set<String> roles;

    public UserResponseDto(UUID id, String email, Set<String> roles) {
        this.id = id;
        this.email = email;
        this.roles = roles;
    }

    public static UserResponseDto fromDomain(User user) {
        return new UserResponseDto(
            user.getId(),
            user.getEmail(),
            user.getRoles().stream().map(com.example.auth.domain.model.Role::getName).collect(Collectors.toSet())
        );
    }
    // Getters
    public UUID getId() { return id; }
    public String getEmail() { return email; }
    public Set<String> getRoles() { return roles; }
}
