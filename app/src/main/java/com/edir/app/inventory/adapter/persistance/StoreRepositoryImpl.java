package com.edir.app.inventory.adapter.persistance;

import com.edir.app.inventory.adapter.InventoryDataMapper;
import com.edir.app.inventory.adapter.persistance.jpa.JpaStoreRepository;
import com.edir.app.inventory.application.out.StoreRepository;
import com.edir.app.inventory.domain.entity.Store;
import com.edir.app.inventory.domain.valueobjects.StoreId;
import com.edir.app.shared.adapter.PersistenceAdapter;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@PersistenceAdapter
class StoreRepositoryImpl implements StoreRepository {
    private final JpaStoreRepository repository;
    private final InventoryDataMapper mapper;

    @Override
    public void save(Store store) {
        repository.save(mapper.storeToStoreEntity(store));
    }

    @Override
    public Optional<Store> findById(StoreId id) {
        return repository.findById(id.id()).map(mapper::storeEntityToStore);
    }

    @Override
    public Optional<Store> findByName(String name) {
        return repository.findStoreEntitiesByName(name)
            .map(mapper::storeEntityToStore);
    }

    @Override
    public List<Store> findAll() {
        return repository.findAll().stream().map(mapper::storeEntityToStore).toList();
    }
}
