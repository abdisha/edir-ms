package com.edir.app.inventory.adapter.rest.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record ApprovalRequest(
    @NotNull
    UUID item,
    @NotNull
    UUID from,
    @Min(value = 0, message = "Quantity must be greater than zero")
    Integer quantity
) {
}
