package com.edir.app.contribution.application.ports.out.query;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

public record PaymentView(
    UUID id,
    BigDecimal amount,
    ZonedDateTime startDate,
    ZonedDateTime  endDate,
    BigDecimal contributionAmount,
    BigDecimal penaltyAmount,
    String contributionName,
    ZonedDateTime paidAt,
    UUID receiptId,
    String Note
) {
}
