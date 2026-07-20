package com.edir.app.contribution.adapter.rest;

import com.edir.app.contribution.application.ports.in.commands.CreateContributionCommand;
import com.edir.app.contribution.application.ports.in.usecases.CreateContributionUseCase;
import com.edir.app.contribution.application.ports.out.query.ContributionQueryService;
import com.edir.app.contribution.application.ports.out.query.ContributionView;
import com.edir.app.shared.domain.entity.PageQuery;
import com.edir.app.shared.domain.entity.PageResult;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import static com.edir.app.shared.EdirConstant.REST_VERSION;

@AllArgsConstructor
@RestController
@RequestMapping(REST_VERSION+"contributions")
public class ContributionController {
    private final CreateContributionUseCase createContributionUseCase;
    private final ContributionQueryService contributionQueryService;

    @PostMapping
    public ResponseEntity<UUID> createContribution(@Valid
                                                       @RequestBody CreateContributionCommand
                                                           contributionCommand){
        var id = createContributionUseCase.execute(contributionCommand);

        return ResponseEntity
            .status(HttpStatus.CREATED).body(id);
    }

    @GetMapping("/active")
    public ResponseEntity<ContributionView> getContributionView() {
        return contributionQueryService.findOpenContribution()
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping()
    public ResponseEntity<PageResult<ContributionView>> getContributionViews(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size) {
        var result = contributionQueryService.findAllContribution(
            new PageQuery(
                page,
                size
            )
        );
        return ResponseEntity.ok(result);
    }


}
