package com.edir.app.edir.application.ports.in.commands;

import jakarta.validation.constraints.NotNull;

public record Address(
        @NotNull String city,
        @NotNull String subcity,
        String worda) {
}
