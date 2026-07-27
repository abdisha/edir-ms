package com.edir.app.inventory.adapter.persistance;

import com.edir.app.edir.application.api.ActiveMemberQuery;
import com.edir.app.inventory.adapter.InventoryDataMapper;
import com.edir.app.inventory.adapter.persistance.jpa.JpaInventoryAllocationRepository;
import com.edir.app.inventory.adapter.rest.response.AllocationResponse;
import com.edir.app.inventory.adapter.rest.response.ItemAllocationResponse;
import com.edir.app.inventory.application.out.AllocationRepository;
import com.edir.app.inventory.domain.entity.Allocation;
import com.edir.app.inventory.domain.valueobjects.AllocationId;
import com.edir.app.inventory.domain.valueobjects.ItemId;
import com.edir.app.shared.adapter.PersistenceAdapter;
import com.edir.app.shared.domain.valueobjects.MemberId;

import java.util.List;
import java.util.Optional;

@PersistenceAdapter
record AllocationRepositoryImpl(JpaInventoryAllocationRepository allocationRepository,
                                ActiveMemberQuery activeMemberQuery,
                                InventoryDataMapper mapper)
    implements AllocationRepository {

    @Override
    public Optional<Allocation> findByAllocationId(AllocationId allocationId) {
        return allocationRepository.findById(allocationId.id())
            .map(mapper::inventoryAllocationEntityToInventoryAllocation);
    }

    @Override
    public Optional<Allocation> findByMemberIdAndItemId(MemberId memberId, ItemId itemId) {
        return allocationRepository.findInventoryAllocationEntitiesByItemIdAndHolderMemberId(itemId.id(), memberId.value())
            .map(mapper::inventoryAllocationEntityToInventoryAllocation);
    }

    @Override
    public Allocation save(Allocation allocation) {
        return mapper.inventoryAllocationEntityToInventoryAllocation(allocationRepository
            .save(mapper.inventoryAllocationToInventoryAllocationEntity(allocation)));
    }

    @Override
    public List<Allocation> findByMemberId(MemberId memberId) {
        return allocationRepository.findInventoryAllocationEntitiesByHolderMemberId(memberId.value())
            .stream()
            .map(mapper::inventoryAllocationEntityToInventoryAllocation)
            .toList();
    }

    @Override
    public List<Allocation> findByItemId(ItemId itemId) {
        return allocationRepository.findInventoryAllocationEntitiesByItemId(itemId.id())
            .stream().map(mapper::inventoryAllocationEntityToInventoryAllocation)
            .toList();
    }

    @Override
    public Optional<AllocationResponse> findAllocationViewByMemberId(MemberId memberId) {
        var allocationView = allocationRepository.findAllocationViewByMemberId(memberId.value());

        if (allocationView.isPresent()) {
            var member = activeMemberQuery.findMember(memberId.value());
            if (member.isPresent()) {
                return Optional.of(new AllocationResponse(
                    allocationView.get().memberId(),
                    member.get().FullName(),
                    allocationView.get().allocationId()
                ));
            }
        }
        return Optional.empty();
    }

    @Override
    public List<ItemAllocationResponse> findAllocatedItem(MemberId memberId) {
         var allocatedItemView = allocationRepository.findAllocationItemViewByItemId(memberId.value());
            if(allocatedItemView.isEmpty()){
                return List.of();
            }
            return allocatedItemView.stream().map(mapper::allocationItemViewToItemAllocationResponse).toList();
    }
}
