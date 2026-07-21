package com.edir.app.user.domain;

import java.util.Set;
import java.util.UUID;

public class User {
    private UUID id;
    private String email;
    private String firstName;

    private String lastName;

    private String password;
    private Set<Role> roles;
    public User(UUID id,
                String email,
                String firstName,
                String lastName,
                String password,
                Set<Role> roles) {

        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.roles = roles;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getLastName() {
        return lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public void assignRole(Role role) {
        this.roles.add(role);
    }
}
