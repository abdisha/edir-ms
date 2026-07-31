package com.edir.app.event.application.port.in.command;

import com.edir.app.event.domain.valueobjects.RelationShip;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

public record CreateFuneralEventCommand(
    @NotNull
    @Size(min=3,max = 100)
    String deceasedPersonFullName,
    @NotNull
    @Size(min=3,max = 100)
    String funeralName,
    @NotNull
    RelationShip relationShip,
    @NotNull
    BigDecimal payout,
    @NotNull
    ZonedDateTime funeralDate,
    @NotNull
    String funeralAddress,
    @NotNull
    UUID memberId
) {
}
