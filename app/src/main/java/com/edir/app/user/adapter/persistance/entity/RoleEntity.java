package com.edir.app.user.adapter.persistance.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "roles", schema = "user_management")
public class RoleEntity {
    @Id
    private String name;

    public RoleEntity() {}
    public RoleEntity(String name) { this.name = name; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
