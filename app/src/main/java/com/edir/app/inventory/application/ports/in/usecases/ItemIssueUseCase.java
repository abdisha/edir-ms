package com.edir.app.inventory.application.ports.in.usecases;

import com.edir.app.inventory.application.ports.in.commands.IssueItemCommand;
import com.edir.app.inventory.application.ports.in.commands.ItemIssueApproveCommand;

import java.util.UUID;

public interface ItemIssueUseCase {
    void issueItem(IssueItemCommand command);
    void Approve(ItemIssueApproveCommand approveCommand);
    void rejected(UUID issueId,UUID issueItem);

}
