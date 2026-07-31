package com.edir.app.event.application.port.out.query;

import com.edir.app.event.domain.valueobjects.RelationShip;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

public record FuneralEventView(
    UUID funeralId,
    String funeralName,
    ZonedDateTime funeralDate,
    String deceasedPersonFullName,
    RelationShip relationShip,
    UUID memberId,
    BigDecimal payout,
    Boolean isClose
) {
}
