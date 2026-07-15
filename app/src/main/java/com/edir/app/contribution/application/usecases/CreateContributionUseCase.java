package com.edir.app.contribution.application.usecases;

import com.edir.app.contribution.application.commands.CreateContributionCommand;

import java.util.UUID;

public interface CreateContributionUseCase {
    UUID execute(CreateContributionCommand createContributionCommand);
}
