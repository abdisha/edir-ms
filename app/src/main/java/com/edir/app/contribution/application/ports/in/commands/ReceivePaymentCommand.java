package com.edir.app.contribution.application.ports.in.commands;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

public record ReceivePaymentCommand(
        @NotNull
        @Max(100000)
        @Min(10)
        BigDecimal amount,
        @NotNull
        UUID receipterId,
        @NotNull
        UUID memberId,
        @NotNull
        ZonedDateTime paymentDate,
        String receiptNumber,
        String remark
) {
}
