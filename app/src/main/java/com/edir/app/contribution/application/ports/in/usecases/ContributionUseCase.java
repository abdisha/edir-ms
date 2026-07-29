package com.edir.app.contribution.application.ports.in.usecases;

import com.edir.app.contribution.application.ports.in.commands.CreateContributionCommand;
import com.edir.app.contribution.domain.valueobjects.ContributionId;

public interface ContributionUseCase {
    ContributionId createContribution(CreateContributionCommand command);
    void closeContribution();
}
