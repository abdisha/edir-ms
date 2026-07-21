package com.edir.app.user.adapter.persistance.jpa;

import com.edir.app.user.adapter.persistance.entity.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaRoleRepository extends JpaRepository<RoleEntity,String> {
}
