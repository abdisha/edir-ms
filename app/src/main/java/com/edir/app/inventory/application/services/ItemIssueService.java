package com.edir.app.inventory.application.services;

import com.edir.app.inventory.application.exceptions.ItemNotFoundException;
import com.edir.app.inventory.application.ports.in.commands.IssueItemCommand;
import com.edir.app.inventory.application.ports.in.commands.ItemIssueApproveCommand;
import com.edir.app.inventory.application.ports.in.usecases.ItemIssueUseCase;
import com.edir.app.inventory.application.ports.out.AllocationRepository;
import com.edir.app.inventory.application.ports.out.ItemIssueRepository;
import com.edir.app.inventory.application.ports.out.ItemRepository;
import com.edir.app.inventory.domain.InventoryAllocationDomainService;
import com.edir.app.inventory.domain.entity.Allocation;
import com.edir.app.inventory.domain.entity.Item;
import com.edir.app.inventory.domain.entity.ItemIssue;
import com.edir.app.inventory.domain.entity.ItemIssueLine;
import com.edir.app.inventory.domain.valueobjects.ItemId;
import com.edir.app.inventory.domain.valueobjects.ItemIssueId;
import com.edir.app.inventory.domain.valueobjects.ItemQuantity;
import com.edir.app.inventory.domain.valueobjects.StoreId;
import com.edir.app.shared.application.usecase.UseCase;
import com.edir.app.shared.domain.exceptions.DomainValidationException;
import com.edir.app.shared.domain.valueobjects.MemberId;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@AllArgsConstructor
@Transactional
@Slf4j
@UseCase
class ItemIssueService implements ItemIssueUseCase {
    private final AllocationRepository allocationRepository;
    private final ItemIssueRepository repository;
    private final InventoryAllocationDomainService allocationService;


    @Override
    public void issueItem(IssueItemCommand command) {

        var itemIssue = repository.findByFuneralId(command.funeralId())
            .orElse(ItemIssue.create(command.funeralId(), new MemberId(command.issuerId())));


        itemIssue.addLine(new ItemId(command.item()),
            new ItemQuantity(command.quantity()));

        repository.save(itemIssue);
    }

    @Override
    public void Approve(ItemIssueApproveCommand command) {
        ItemIssue itemIssue = repository
            .findById(new ItemIssueId(command.issueId()))
            .orElseThrow(() ->
                new ItemNotFoundException("Item issue not found with id: " + command.issueId())
            );

        ItemId itemId = new ItemId(command.item());

        ItemQuantity quantity = ItemQuantity.of(command.quantity());

        ItemIssueLine issueLine = itemIssue
            .getItemIssueLines()
            .stream()
            .filter(line -> line.getItemId().equals(itemId))
            .findFirst()
            .orElseThrow(() ->
                new DomainValidationException(
                    "No item issue line found"
                )
            );


        issueLine.validateCanApprove(quantity);

        List<Allocation> allocations =
            allocationRepository.findByAllocationByItem(itemId);

        //  First validates the TOTAL available quantity.
        //  Then consumes stock across stores.
        allocationService.issue(allocations, itemId, quantity);


        itemIssue.approve(itemId.id(), quantity);


        allocationRepository.saveAll(allocations);
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
