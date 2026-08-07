package com.edir.app.inventory.adapter.rest;


import com.edir.app.inventory.application.ports.in.commands.IssueItem;
import com.edir.app.inventory.application.ports.in.commands.IssueItemCommand;
import com.edir.app.inventory.application.ports.in.usecases.ItemIssueUseCase;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import static com.edir.app.shared.EdirConstant.REST_VERSION;

@AllArgsConstructor
@RestController
@RequestMapping(REST_VERSION + "inventory-issue")
class InventoryIssueController {

    private final ItemIssueUseCase itemIssueUseCase;


    @PostMapping
    public ResponseEntity<Void> issueItem(@Valid @RequestBody IssueItemCommand command) {
        itemIssueUseCase.issueItem(command);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/approve/{issueId}")
    public ResponseEntity<Void> approveIssue(@PathVariable UUID issueId,
                                             @Valid @RequestBody IssueItem issueItem) {

        itemIssueUseCase.Approve(issueId, issueItem);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/reject/{issueId}")
    public ResponseEntity<Void> rejectIssue(@PathVariable UUID issueId,
                                             @Valid @RequestBody IssueItem issueItem) {

        itemIssueUseCase.rejected(issueId, issueItem);
        return ResponseEntity.ok().build();
    }
}
