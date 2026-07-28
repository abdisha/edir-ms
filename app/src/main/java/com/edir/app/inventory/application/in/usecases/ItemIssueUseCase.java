package com.edir.app.inventory.application.in.usecases;

import com.edir.app.inventory.application.in.commands.IssueItemCommand;

public interface ItemIssueUseCase {
    void issueItem(IssueItemCommand command);

}
