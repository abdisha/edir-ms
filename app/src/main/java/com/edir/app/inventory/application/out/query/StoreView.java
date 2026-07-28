package com.edir.app.inventory.application.out.query;

import java.util.UUID;

public record StoreView(
    UUID id,
    String name,
    String location,
    UUID ownerId
) {
}
