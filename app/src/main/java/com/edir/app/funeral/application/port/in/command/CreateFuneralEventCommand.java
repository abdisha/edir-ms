package com.edir.app.funeral.application.port.in.command;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.ZonedDateTime;
import java.util.UUID;

public record CreateFuneralEventCommand(
    @NotNull
    @Size(min=3,max = 100)
    String name,
    @NotNull
    ZonedDateTime funeralDate,
    @NotNull
    UUID memberId
) {
}
