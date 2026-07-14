package com.edir.app.contribution.application.usecases;

import com.edir.app.contribution.application.commands.CreateContributionCommand;

public interface CreateContributionUseCase {
    void execute(CreateContributionCommand createContributionCommand);
}
