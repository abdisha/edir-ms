package com.edir.app.funeral.application.command;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record IssueEventItemCommand(
    @NotNull
    @Size(max = 10)
    String itemCode,
    @NotNull
    @Max(100000)
    Integer quantity) {
}
