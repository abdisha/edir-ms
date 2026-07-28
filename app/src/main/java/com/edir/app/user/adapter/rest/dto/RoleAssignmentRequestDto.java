package com.edir.app.user.adapter.rest.dto;

import lombok.Getter;

import java.util.UUID;

@Getter
public class RoleAssignmentRequestDto {
    private String email;
    private UUID roleId;
}
