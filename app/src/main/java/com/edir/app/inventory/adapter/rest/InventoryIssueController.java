package com.edir.app.inventory.adapter.rest;


import com.edir.app.inventory.application.ports.in.commands.IssueItem;
import com.edir.app.inventory.application.ports.in.commands.IssueItemCommand;
import com.edir.app.inventory.application.ports.in.usecases.ItemIssueUseCase;
import com.edir.app.inventory.application.ports.out.query.IssueItemView;
import com.edir.app.inventory.application.ports.out.query.IssueQueryService;
import com.edir.app.inventory.application.ports.out.query.IssueView;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static com.edir.app.shared.EdirConstant.REST_VERSION;

@AllArgsConstructor
@RestController
@RequestMapping(REST_VERSION + "inventory-issue")
class InventoryIssueController {

    private final ItemIssueUseCase itemIssueUseCase;
    private final IssueQueryService queryService;

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

    @GetMapping
    public ResponseEntity<List<IssueView>> getIssues() {
        return ResponseEntity.ok(queryService.getIssues());
    }

    @GetMapping("/{issueId}")
    public ResponseEntity<List<IssueItemView>> getIssuesItem(@PathVariable UUID issueId){
        return ResponseEntity.ok(queryService.getIssuesItem(issueId));
    }

    @PutMapping("/reject/{issueId}")
    public ResponseEntity<Void> rejectIssue(@PathVariable UUID issueId,
                                             @Valid @RequestBody IssueItem issueItem) {

        itemIssueUseCase.rejected(issueId, issueItem);
        return ResponseEntity.ok().build();
    }
}
