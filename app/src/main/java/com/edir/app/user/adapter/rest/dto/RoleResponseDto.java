package com.edir.app.user.adapter.rest.dto;

public class RoleResponseDto {
    private String roleName;
    public RoleResponseDto(String roleName) { this.roleName = roleName; }
    public String getRoleName() { return roleName; }
}
