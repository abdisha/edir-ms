package com.edir.app.user.adapter.rest;

import com.edir.app.user.adapter.rest.dto.*;
import com.edir.app.user.application.usecase.AccountUseCase;
import com.edir.app.user.domain.Role;
import com.edir.app.user.domain.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.edir.app.shared.EdirConstant.REST_VERSION;

@RestController
@RequestMapping(REST_VERSION+"accounts")
public class AccountController {
    private final AccountUseCase accountUseCase;

    public AccountController(AccountUseCase accountUseCase) {
        this.accountUseCase = accountUseCase;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> register(@RequestBody UserRegisterRequestDto dto) {
        User user = accountUseCase.registerUser(dto.getEmail(), dto.getPassword());
        return ResponseEntity.ok(UserResponseDto.fromDomain(user));
    }

    @PostMapping("/roles")
    @PreAuthorize("hasRole('ADMIN')") // Enforce execution guard checks via Spring filters
    public ResponseEntity<RoleResponseDto> createRole(@RequestBody RoleCreateRequestDto dto) {
        Role role = accountUseCase.createRole(dto.getRoleName());
        return ResponseEntity.ok(new RoleResponseDto(role.name()));
    }

    @PostMapping("/assign-role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponseDto> assignRole(@RequestBody RoleAssignmentRequestDto dto) {
        User user = accountUseCase.assignRoleToUser(dto.getEmail(), dto.getRoleName());
        return ResponseEntity.ok(UserResponseDto.fromDomain(user));
    }
}
