package com.edir.app.inventory.application.services;

import com.edir.app.inventory.application.in.commands.IssueItemCommand;
import com.edir.app.inventory.application.in.usecases.ItemIssueUseCase;
import com.edir.app.inventory.application.out.AllocationRepository;
import com.edir.app.inventory.application.out.ItemIssueRepository;
import com.edir.app.inventory.domain.entity.Allocation;
import com.edir.app.inventory.domain.entity.ItemIssue;
import com.edir.app.inventory.domain.valueobjects.ItemId;
import com.edir.app.inventory.domain.valueobjects.ItemQuantity;
import com.edir.app.shared.application.usecase.UseCase;
import com.edir.app.shared.domain.valueobjects.MemberId;
import lombok.AllArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@AllArgsConstructor
@UseCase
@Transactional
class ItemIssueService implements ItemIssueUseCase {
    private final AllocationRepository allocationRepository;
    private final ItemIssueRepository repository;

    @Override
    public void issueItem(IssueItemCommand command) {

        var itemIssue = ItemIssue.create(command.funeralId(),new MemberId(command.issuerId()));

         command.issueItems().forEach(
             i->{
                 Optional<Allocation> allocationOptional =
                     allocationRepository.findByMemberId(new MemberId(i.from()));
                 if(allocationOptional.isEmpty()){
                     return;
                 }
                 Allocation allocation = allocationOptional.get();
                 allocation.issueItems(new ItemId(i.item()),new ItemQuantity(i.quantity()));
                 itemIssue.addLine(new ItemId(i.item()),new MemberId(i.from()),new ItemQuantity(i.quantity()));
                 allocationRepository.save(allocation);
             }
         );

        repository.save(itemIssue);
    }
}
