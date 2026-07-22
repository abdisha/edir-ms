package com.edir.app.inventory.domain.valueobjects;

public enum MovementType {
    PURCHASE(1),
    ISSUED(-1),
    DAMAGE(-1),
    RETURN(1);

    private final int direction;

    MovementType(int direction) {
        this.direction = direction;
    }

    public int apply(int currentQuantity, int quantity) {
        return currentQuantity + (direction * quantity);
    }

    public boolean increasesStock() {
        return direction > 0;
    }

    public boolean decreasesStock() {
        return direction < 0;
    }
}
