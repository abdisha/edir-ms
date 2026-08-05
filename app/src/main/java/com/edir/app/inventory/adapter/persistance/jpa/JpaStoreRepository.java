package com.edir.app.inventory.adapter.persistance.jpa;

import com.edir.app.inventory.adapter.persistance.entity.StoreEntity;
import com.edir.app.inventory.application.ports.out.query.StoreView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface JpaStoreRepository extends JpaRepository<StoreEntity, UUID> {
    Optional<StoreEntity> findStoreEntitiesByName(String name);

    @Query(value = """
            select  new com.edir.app.inventory.application.out.query.StoreView(
            s.id,
            s.name,
            s.location,
            s.storeOwner
            )
            from StoreEntity s
        """)
    Collection<StoreView> findAllStores();
}
