package com.edir.app.funeral.application.port.in.usecases;

import com.edir.app.funeral.application.port.in.command.IssueEventItemCommand;

public interface IssueEventItemUseCase {
    void execute(IssueEventItemCommand itemCommand);
}
