package com.edir.app.inventory.domain.valueobjects;

public record ItemQuantity(Integer quantity) {
    public ItemQuantity {
        if(quantity==null){
            throw new IllegalArgumentException("Quantity cannot be null");
        }

        if(quantity <0){
            throw new IllegalArgumentException("Quantity cannot be negative");
        }

    }

    public static ItemQuantity of(Integer quantity){
        return new ItemQuantity(quantity);
    }

    public ItemQuantity addQuantity(Integer quantity){
        if(quantity==null || quantity<0){
            throw new IllegalArgumentException("Quantity cannot be null or negative");
        }
        return new ItemQuantity(this.quantity+quantity);
    }

    public ItemQuantity  subtractQuantity(Integer quantity){
        if(quantity==null || quantity<0){
            throw new IllegalArgumentException("Quantity cannot be null or negative");
        }
        return new ItemQuantity(this.quantity-quantity);
    }
}
