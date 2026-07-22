package com.edir.app.inventory.domain.entity;


import com.edir.app.inventory.domain.valueobjects.MovementType;

import java.util.UUID;

public class ItemMovement {
    private UUID movementId;
    private Item item;
    private MovementType movementType;

}
