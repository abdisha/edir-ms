package com.edir.app.user.adapter.rest.dto;

import com.edir.app.user.domain.Role;
import com.edir.app.user.domain.User;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;


public record UserResponseDto(UUID id, String email, Set<String> roles) {

    public static UserResponseDto fromDomain(User user) {
        return new UserResponseDto(
            user.getId(),
            user.getEmail(),
            user.getRoles().stream().map(Role::name).collect(Collectors.toSet())
        );
    }
}
