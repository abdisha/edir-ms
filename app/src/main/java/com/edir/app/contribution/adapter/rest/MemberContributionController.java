package com.edir.app.contribution.adapter.rest;

import com.edir.app.contribution.application.commands.ReceivePaymentCommand;
import com.edir.app.contribution.application.usecases.ReceivePaymentUseCase;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.edir.app.shared.EdirConstant.REST_VERSION;

@AllArgsConstructor
@RestController
@RequestMapping(REST_VERSION + "member-contributions")
public class MemberContributionController {

    private final ReceivePaymentUseCase receivePaymentUseCase;

    @PostMapping
    @ApiResponse(responseCode = "204", description = "Payment received successfully")
    public ResponseEntity<Void> receivePayment(@Valid @RequestBody
                                               ReceivePaymentCommand command) {
        receivePaymentUseCase.execute(command);
        return ResponseEntity
            .status(HttpStatus.NO_CONTENT)
            .build();
    }
}
