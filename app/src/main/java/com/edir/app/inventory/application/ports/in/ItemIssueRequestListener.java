package com.edir.app.inventory.application.ports.in;

import com.edir.app.inventory.application.exceptions.ItemNotFoundException;
import com.edir.app.inventory.application.ports.in.commands.IssueItem;
import com.edir.app.inventory.application.ports.in.commands.IssueItemCommand;
import com.edir.app.inventory.application.ports.in.usecases.ItemIssueUseCase;
import com.edir.app.inventory.application.ports.out.ItemRepository;
import com.edir.app.inventory.domain.entity.Item;
import com.edir.app.shared.domain.event.ItemIssueAddedEvent;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.modulith.events.ApplicationModuleListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@AllArgsConstructor
@Transactional
@Component
class ItemIssueRequestListener {

    private final ItemIssueUseCase itemIssueUseCase;
    private final ItemRepository itemRepository;

    @ApplicationModuleListener
    public void on (ItemIssueAddedEvent itemIssueAddedEvent){
        log.info("ItemIssueAddedEvent received id with: {}", itemIssueAddedEvent.itemCode());

        Optional<Item> result = itemRepository.findByItemCode(itemIssueAddedEvent.itemCode());
        if (result.isEmpty()){
           log.error("Item not found");
            throw new ItemNotFoundException("Item not found");
        }

        itemIssueUseCase.issueItem(
            new IssueItemCommand(
                List.of(new IssueItem(
                    result.get().getId().id(),
                    itemIssueAddedEvent.funeralEventId(),
                    itemIssueAddedEvent.quantity()
                )),
                itemIssueAddedEvent.funeralEventId(),
                itemIssueAddedEvent.requestedFor().value()
            )
        );
    }
}
