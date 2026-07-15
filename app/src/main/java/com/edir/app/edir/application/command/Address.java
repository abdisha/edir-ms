package com.edir.app.edir.application.command;

import jakarta.validation.constraints.NotNull;

public record Address(
        @NotNull String city,
        @NotNull String subcity,
        String worda) {
}
