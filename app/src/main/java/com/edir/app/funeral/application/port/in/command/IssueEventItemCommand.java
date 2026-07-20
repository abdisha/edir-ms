package com.edir.app.funeral.application.port.in.command;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record IssueEventItemCommand(
    @NotNull
    UUID funeralId,
    @NotNull
    @Size(max = 10)
    String itemCode,
    @NotNull
    @Size(max = 100)
    String name,
    @NotNull
    @Max(100000)
    Integer quantity) {

}
