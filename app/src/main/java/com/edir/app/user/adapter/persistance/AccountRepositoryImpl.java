package com.edir.app.user.adapter.persistance;

import com.edir.app.user.adapter.persistance.entity.RoleEntity;
import com.edir.app.user.adapter.persistance.entity.UserEntity;
import com.edir.app.user.adapter.persistance.jpa.JpaRoleRepository;
import com.edir.app.user.adapter.persistance.jpa.JpaUserRepository;
import com.edir.app.user.application.AccountRepository;
import com.edir.app.user.domain.Role;
import com.edir.app.user.domain.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@AllArgsConstructor
@Component
public class AccountRepositoryImpl implements AccountRepository {
    private final JpaUserRepository userRepository;
    private final JpaRoleRepository roleRepository;


    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email).map(this::toDomainUser);
    }

    @Override
    public User saveUser(User user) {
        UserEntity entity = new UserEntity();
        entity.setId(user.getId());
        entity.setFirstName(user.getFirstName());
        entity.setLastName(user.getLastName());
        entity.setEmail(user.getEmail());
        entity.setPassword(user.getPassword());
        entity.setRoles(user.getRoles().stream()
            .map(r -> new RoleEntity(r.id(),r.name()))
            .collect(Collectors.toSet()));

        userRepository.save(entity);
        return user;
    }

    @Override
    public Optional<Role> findRoleById(UUID uuid) {
        return roleRepository.findById(uuid)
            .map(entity -> new Role(entity.getId(), entity.getName()));
    }

    @Override
    public Optional<Role> findRoleByName(String name) {
        return roleRepository.findRoleEntitiesByName(name);
    }

    @Override
    public Role saveRole(Role role) {
        RoleEntity entity = new RoleEntity(role.id(),role.name());
        roleRepository.save(entity);
        return role;
    }

    private User toDomainUser(UserEntity entity) {
        return new User(
            entity.getId(),
            entity.getEmail(),
            entity.getFirstName(),
            entity.getLastName(),
            entity.getPassword(),
            entity.getRoles().stream().map(r -> new Role(r.getId(),r.getName())).collect(Collectors.toSet())
        );
    }
}
