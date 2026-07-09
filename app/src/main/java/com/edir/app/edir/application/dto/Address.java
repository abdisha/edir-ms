package com.edir.app.edir.application.dto;

import jakarta.validation.constraints.NotNull;

public record Address(
        @NotNull String city,
        @NotNull String subcity,
        String worda) {
}
