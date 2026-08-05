package com.edir.app.inventory.application.ports.out;

import com.edir.app.inventory.domain.entity.Store;
import com.edir.app.inventory.domain.valueobjects.StoreId;

import java.util.List;
import java.util.Optional;

public interface StoreRepository {
    void save(Store store);
    Optional<Store> findById(StoreId id);
    Optional<Store> findByName(String name);
    List<Store> findAll();
}
