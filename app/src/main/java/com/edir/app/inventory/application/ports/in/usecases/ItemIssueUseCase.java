package com.edir.app.inventory.application.ports.in.usecases;

import com.edir.app.inventory.application.ports.in.commands.IssueItemCommand;

public interface ItemIssueUseCase {
    void issueItem(IssueItemCommand command);

}
