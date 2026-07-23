package com.edir.app.inventory.adapter.persistance.jpa;

import com.edir.app.inventory.adapter.persistance.entity.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface JpaItemRepository extends JpaRepository<ItemEntity, UUID> {
}
