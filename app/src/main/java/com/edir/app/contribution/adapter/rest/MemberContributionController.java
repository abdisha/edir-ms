package com.edir.app.contribution.adapter.rest;

import com.edir.app.contribution.application.ports.in.commands.ReceivePaymentCommand;
import com.edir.app.contribution.application.ports.in.usecases.ReceivePaymentUseCase;
import com.edir.app.contribution.application.ports.out.query.MemberContributionQueryService;
import com.edir.app.contribution.application.ports.out.query.MemberContributionView;
import com.edir.app.contribution.application.ports.out.query.PaymentView;
import com.edir.app.shared.domain.entity.PageQuery;
import com.edir.app.shared.domain.entity.PageResult;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static com.edir.app.shared.EdirConstant.REST_VERSION;

@AllArgsConstructor
@RestController
@RequestMapping(REST_VERSION + "member-contributions")
public class MemberContributionController {

    private final ReceivePaymentUseCase receivePaymentUseCase;
    private final MemberContributionQueryService queryService;

    @PostMapping
    @ApiResponse(responseCode = "204", description = "Payment received successfully")
    public ResponseEntity<Void> receivePayment(@Valid @RequestBody
                                               ReceivePaymentCommand command) {
        receivePaymentUseCase.execute(command);
        return ResponseEntity
            .status(HttpStatus.NO_CONTENT)
            .build();
    }

    @GetMapping("/contribution/{contributionId}")
    public ResponseEntity<PageResult<MemberContributionView>> getMemberContributionViews(
        @PathVariable UUID contributionId,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size) {
        var result = queryService.findMemberContribution(
            contributionId,
            new PageQuery(
                page,
                size
            )
        );
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{memberContributionId}")
    public ResponseEntity<MemberContributionView> getMemberContributionView(
        @PathVariable UUID memberContributionId) {
        return queryService.findMemberContributionById(
                memberContributionId
            ).map(ResponseEntity::ok)
            .orElseGet(
                () -> ResponseEntity.notFound().build()
            );
    }

    @GetMapping("/{memberContributionId}/payments")
    public ResponseEntity<List<PaymentView>> getPayments(@PathVariable UUID memberContributionId) {
        return
            ResponseEntity.ok(
                queryService
                    .findPayments(memberContributionId));
    }
}
