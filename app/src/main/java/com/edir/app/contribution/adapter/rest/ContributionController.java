package com.edir.app.contribution.adapter.rest;

import com.edir.app.contribution.application.ports.in.commands.CreateContributionCommand;
import com.edir.app.contribution.application.ports.in.usecases.ContributionUseCase;
import com.edir.app.contribution.application.ports.out.query.ContributionQueryService;
import com.edir.app.contribution.application.ports.out.query.ContributionView;
import com.edir.app.shared.domain.entity.PageQuery;
import com.edir.app.shared.domain.entity.PageResult;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

import static com.edir.app.shared.EdirConstant.REST_VERSION;

@AllArgsConstructor
@RestController
@RequestMapping(REST_VERSION+"contributions")
public class ContributionController {
    private final ContributionUseCase contributionUseCase;
    private final ContributionQueryService contributionQueryService;

    @PostMapping
    public ResponseEntity<UUID> createContribution(@Valid @RequestBody CreateContributionCommand contributionCommand){
        var id = contributionUseCase.createContribution(contributionCommand);
        return ResponseEntity
            .status(HttpStatus.CREATED).body(id.value());
    }

    @GetMapping("/active")
    public ResponseEntity<Optional<ContributionView>> getContributionView() {
        return ResponseEntity.ok(contributionQueryService.findOpenContribution());
    }

    @GetMapping()
    public ResponseEntity<PageResult<ContributionView>> getContributionViews(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size) {
        var result = contributionQueryService
            .findAllContribution(new PageQuery(page,size));

        return ResponseEntity.ok(result);
    }


}
