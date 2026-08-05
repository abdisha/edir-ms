package com.edir.app.inventory.adapter.persistance.query;

import com.edir.app.inventory.adapter.persistance.jpa.JpaStoreRepository;
import com.edir.app.inventory.application.ports.out.query.StoreQueryRepository;
import com.edir.app.inventory.application.ports.out.query.StoreView;
import com.edir.app.shared.adapter.PersistenceAdapter;
import lombok.AllArgsConstructor;

import java.util.List;

@AllArgsConstructor
@PersistenceAdapter
class StoreQueryRepositoryImpl implements StoreQueryRepository {
    private final JpaStoreRepository jpaStoreRepository;

    @Override
    public List<StoreView> findStore() {
        return jpaStoreRepository.findAllStores()
            .stream()
            .toList();
    }
}
