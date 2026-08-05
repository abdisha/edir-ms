package com.edir.app.inventory.adapter.persistance.jpa;

import com.edir.app.inventory.adapter.persistance.entity.ItemEntity;
import com.edir.app.inventory.application.ports.out.query.ItemView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface JpaItemRepository extends JpaRepository<ItemEntity, UUID> {
    @Query(value = """
    select new com.edir.app.inventory.application.out.query.ItemView(
    i.id,
    i.name,
    i.status,
    i.quantityAtHand,
    i.allocatedQuantity,
    i.itemCode

    ) from ItemEntity i
""")
    List<ItemView> findAllItems();

    @Query(value = """
    select new com.edir.app.inventory.application.out.query.ItemView(
    i.id,
    i.name,
    i.status,
    i.quantityAtHand,
    i.allocatedQuantity,
    i.itemCode

    ) from ItemEntity i where i.quantityAtHand-i.allocatedQuantity>0
""")
    List<ItemView> findAllUnAllocatedItems();

    @Query(value = """
    select new com.edir.app.inventory.application.out.query.ItemView(
    i.id,
    i.name,
    i.status,
    i.quantityAtHand,
    i.allocatedQuantity,
    i.itemCode
    ) from ItemEntity i where i.id =:id
""")
    Optional<ItemView> findItemViewById(UUID id);


}
