package com.edir.app.user.application.usecase;

import com.edir.app.user.domain.Role;
import com.edir.app.user.domain.User;

import java.util.Optional;

public interface AccountUseCase {
    Optional<User> findByEmail(String email);
    User registerUser(String email, String rawPassword);
    Role createRole(String roleName);
    User assignRoleToUser(String email, String roleName);
}
