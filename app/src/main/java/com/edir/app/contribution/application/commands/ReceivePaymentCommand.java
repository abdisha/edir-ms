package com.edir.app.contribution.application.commands;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

public record ReceivePaymentCommand(
        BigDecimal amount,
        UUID receipterId,
        UUID memberId,
        ZonedDateTime paymentDate,
        String paymentMethod,
        String receiptNumber,
        String note
) {
}
