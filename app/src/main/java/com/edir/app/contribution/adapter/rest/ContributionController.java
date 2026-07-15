package com.edir.app.contribution.adapter.rest;

import com.edir.app.contribution.application.commands.CreateContributionCommand;
import com.edir.app.contribution.application.usecases.CreateContributionUseCase;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

import static com.edir.app.shared.EdirConstant.REST_VERSION;

@AllArgsConstructor
@RestController
@RequestMapping(REST_VERSION+"contributions")
public class ContributionController {
    private final CreateContributionUseCase createContributionUseCase;

    @PostMapping
    public ResponseEntity<UUID> createContribution(@Valid
                                                       @RequestBody CreateContributionCommand
                                                           contributionCommand){
        var id = createContributionUseCase.execute(contributionCommand);

        return ResponseEntity
            .status(HttpStatus.CREATED).body(id);
    }


}
