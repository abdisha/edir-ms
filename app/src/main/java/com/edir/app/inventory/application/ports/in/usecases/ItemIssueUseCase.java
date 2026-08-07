package com.edir.app.inventory.application.ports.in.usecases;

import com.edir.app.inventory.application.ports.in.commands.IssueItem;
import com.edir.app.inventory.application.ports.in.commands.IssueItemCommand;

import java.util.UUID;

public interface ItemIssueUseCase {
    void issueItem(IssueItemCommand command);
    void Approve(UUID issueId, IssueItem issueItem);
    void rejected(UUID issueId,IssueItem issueItem);

}
