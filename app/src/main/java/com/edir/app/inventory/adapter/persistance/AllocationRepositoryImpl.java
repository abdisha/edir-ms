package com.edir.app.inventory.adapter.persistance;

import com.edir.app.edir.application.api.ActiveMemberQuery;
import com.edir.app.inventory.adapter.InventoryDataMapper;
import com.edir.app.inventory.adapter.persistance.jpa.JpaInventoryAllocationRepository;
import com.edir.app.inventory.adapter.rest.response.AllocationResponse;
import com.edir.app.inventory.application.ports.out.AllocationRepository;
import com.edir.app.inventory.application.ports.out.query.AllocationView;
import com.edir.app.inventory.application.ports.out.query.StoreAllocationSummaryView;
import com.edir.app.inventory.domain.entity.Allocation;
import com.edir.app.inventory.domain.valueobjects.StoreId;
import com.edir.app.shared.adapter.PersistenceAdapter;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@PersistenceAdapter
record AllocationRepositoryImpl(JpaInventoryAllocationRepository allocationRepository,
                                ActiveMemberQuery activeMemberQuery,
                                InventoryDataMapper mapper)
    implements AllocationRepository {

    @Override
    public Allocation save(Allocation allocation) {
        return mapper.inventoryAllocationEntityToInventoryAllocation(allocationRepository
            .save(mapper.inventoryAllocationToInventoryAllocationEntity(allocation)));
    }

    @Override
    public Optional<Allocation> findByStoreId(StoreId storeId) {
        return allocationRepository.findAllocationEntitiesByStoreId(storeId.id())
            .map(mapper::inventoryAllocationEntityToInventoryAllocation);
    }


    public List<AllocationResponse> findAllocationViewByStoreId(StoreId storeId) {
        var allocationView = allocationRepository.findAllocationViewByStoreId(storeId.id());

        return createAllocationResponse(allocationView);
    }

    @Override
    public List<AllocationResponse> findAllocatedItem(StoreId storeId) {
         var allocatedItemView = allocationRepository.findAllocationViewByItemId(storeId.id());
           return createAllocationResponse(allocatedItemView);
    }

    @Override
    public List<StoreAllocationSummaryView> getAllocationSummary() {
        return allocationRepository.getStoreAllocationSummary();
    }


    private  ArrayList<AllocationResponse> createAllocationResponse(List<AllocationView> allocationView) {
        var allocationResponse = new ArrayList<AllocationResponse>();
        var member = activeMemberQuery.findActiveMembers();

        for (AllocationView view : allocationView) {
            var memberSummary = member.stream().filter(m -> m.memberId().equals(view.storeOwner())).findFirst();

            memberSummary.ifPresent(summary -> allocationResponse.add(
                new AllocationResponse(
                    view.storeId(),
                    view.storeName(),
                    summary.memberId(),
                    summary.fullName(),
                    view.allocationId(),
                    view.itemId(),
                    view.itemName(),
                    view.itemCode(),
                    view.quantityAtStore(),
                    view.issuedQuantity(),
                    view.receivedDate()
                )));

        }
        return allocationResponse;
    }
}
