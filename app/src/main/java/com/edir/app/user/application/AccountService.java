package com.edir.app.user.application;

import com.edir.app.user.application.usecase.AccountUseCase;
import com.edir.app.user.domain.Role;
import com.edir.app.user.domain.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Slf4j
@Component
public class AccountService implements AccountUseCase {
    private final AccountRepository accountRepository;
    private final PasswordEncoder encoder;

    public AccountService(AccountRepository accountRepository,
                          PasswordEncoder encoder) {
        this.accountRepository = accountRepository;
        this.encoder = encoder;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return accountRepository.findByEmail(email);
    }

    @Override
    public User registerUser(String email, String rawPassword) {
        if (accountRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email already registered");
        }

        String encryptedPassword = encoder.encode(rawPassword);

        // Auto-assign default standard role safely
        Set<Role> defaultRoles = new HashSet<>();
        accountRepository.findRoleByName("ROLE_USER")
            .ifPresent(defaultRoles::add);

        User newUser = new User(UUID.randomUUID(), email, encryptedPassword, defaultRoles);
        return accountRepository.saveUser(newUser);
    }

    @Override
    public Role createRole(String roleName) {
        Role role = new Role(roleName);
        if (accountRepository.findRoleByName(role.name()).isPresent()) {
            throw new IllegalArgumentException("Role already exists");
        }
        return accountRepository.saveRole(role);
    }

    @Override
    public User assignRoleToUser(String email, String roleName) {
        User user = accountRepository.findByEmail(email)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Role normalizedRole = new Role(roleName);
        Role role = accountRepository.findRoleByName(normalizedRole.name())
            .orElseThrow(() -> new IllegalArgumentException("Role does not exist"));

        user.assignRole(role);
        return accountRepository.saveUser(user);
    }

}
