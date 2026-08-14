package com.edir.app.inventory.application.services;

import com.edir.app.inventory.application.ports.in.commands.IssueItem;
import com.edir.app.inventory.application.ports.in.commands.IssueItemCommand;
import com.edir.app.inventory.application.ports.in.usecases.ItemIssueUseCase;
import com.edir.app.inventory.application.ports.out.AllocationRepository;
import com.edir.app.inventory.application.ports.out.ItemIssueRepository;
import com.edir.app.inventory.domain.entity.Allocation;
import com.edir.app.inventory.domain.entity.ItemIssue;
import com.edir.app.inventory.domain.valueobjects.ItemId;
import com.edir.app.inventory.domain.valueobjects.ItemIssueId;
import com.edir.app.inventory.domain.valueobjects.ItemQuantity;
import com.edir.app.inventory.domain.valueobjects.StoreId;
import com.edir.app.shared.application.usecase.UseCase;
import com.edir.app.shared.domain.valueobjects.MemberId;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Transactional
@Slf4j
@UseCase
class ItemIssueService implements ItemIssueUseCase {
    private final AllocationRepository allocationRepository;
    private final ItemIssueRepository repository;

    @Override
    public void issueItem(IssueItemCommand command) {

       var itemIssue = repository.findByFuneralId(command.funeralId())
           .orElse(ItemIssue.create(command.funeralId(),new MemberId(command.issuerId())));

         command.issueItems()
             .forEach(
             i->{
                 itemIssue.addLine(new ItemId(i.item()),
                     new StoreId(i.from()),
                     new ItemQuantity(i.quantity()));
             }
         );

        repository.save(itemIssue);
    }

    @Override
    public void Approve(UUID issueId, IssueItem issueItem) {
        Optional<ItemIssue> result = repository.findById(new ItemIssueId(issueId));
        if (result.isEmpty()) {
            return;
        }

        ItemIssue itemIssue = result.get();
        itemIssue.approve(issueItem.item(), new ItemQuantity(issueItem.quantity()));

        Optional<Allocation> allocationOptional = allocationRepository
            .findByStoreId(new StoreId(issueItem.from()));

        if (allocationOptional.isPresent()) {
            Allocation allocation = allocationOptional.get();
            allocation.issueItems(new ItemId(issueItem.item()), new ItemQuantity(issueItem.quantity()));
            allocationRepository.save(allocation);
        }else{
            log.warn("Couldn't find any allocated store for this item: {}",issueItem.item());
        }

        itemIssue.addLine(new ItemId(issueItem.item()),
            new StoreId(issueItem.from()),
            new ItemQuantity(issueItem.quantity()));
        repository.save(itemIssue);
    }

    @Override
    public void rejected(UUID issueId, UUID issueItem) {
        Optional<ItemIssue> result = repository.findById(new ItemIssueId(issueId));
        if (result.isEmpty()) {
            return;
        }
        ItemIssue itemIssue = result.get();
        itemIssue.reject(issueItem);

        repository.save(itemIssue);
    }
}
