package com.edir.app.user.application.usecase;

import com.edir.app.user.domain.Role;
import com.edir.app.user.domain.User;

public interface AccountUseCase {
    User registerUser(String email, String rawPassword);
    Role createRole(String roleName);
    User assignRoleToUser(String email, String roleName);
}
