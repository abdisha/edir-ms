package com.edir.app.user.application;

import com.edir.app.user.domain.Role;
import com.edir.app.user.domain.User;

import java.util.Optional;
import java.util.UUID;

public interface AccountRepository {
    Optional<User> findByEmail(String email);
    User saveUser(User user);
    Optional<Role> findRoleById(UUID id);
    Optional<Role> findRoleByName(String name);
    Role saveRole(Role role);
}
