package com.edir.app.contribution.application.ports.in.usecases;

import com.edir.app.contribution.application.ports.in.commands.CreateContributionCommand;

import java.util.UUID;

public interface CreateContributionUseCase {
    UUID execute(CreateContributionCommand createContributionCommand);
}
