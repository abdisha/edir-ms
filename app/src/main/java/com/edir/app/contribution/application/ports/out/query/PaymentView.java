package com.edir.app.contribution.application.ports.out.query;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

public record PaymentView(
    UUID id,
    BigDecimal amount,
    ZonedDateTime paidAt,
    UUID receiptId,
    String Note
) {
}
