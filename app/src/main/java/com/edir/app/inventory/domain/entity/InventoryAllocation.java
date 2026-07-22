package com.edir.app.inventory.domain.entity;

import com.edir.app.inventory.domain.exceptions.InsufficientQuantityException;
import com.edir.app.inventory.domain.exceptions.InvalidItemQuantityException;

import java.util.Objects;
import java.util.UUID;

public class InventoryAllocation {

    private final UUID id;

    private final UUID itemId;

    private UUID holderMemberId;

    private int quantityOnHand;


    // Private constructor
    private InventoryAllocation(
        UUID id,
        UUID itemId,
        UUID holderMemberId,
        int quantityOnHand) {

        this.id = id;
        this.itemId = itemId;
        this.holderMemberId = holderMemberId;
        this.quantityOnHand = quantityOnHand;
    }


    /**
     * Create new allocation
     */
    public static InventoryAllocation create(
        UUID itemId,
        UUID holderMemberId,
        int initialQuantity) {


        validateQuantity(initialQuantity);


        return new InventoryAllocation(
            UUID.randomUUID(),
            Objects.requireNonNull(itemId),
            Objects.requireNonNull(holderMemberId),
            initialQuantity
        );
    }

    public static InventoryAllocation rehydrate(
        UUID id,
        UUID itemId,
        UUID holderMemberId,
        int quantityOnHand) {


        return new InventoryAllocation(
            id,
            itemId,
            holderMemberId,
            quantityOnHand
        );
    }

    public void receive(int quantity){

        validatePositiveQuantity(quantity);

        quantityOnHand += quantity;
    }


    public void issue(int quantity){

        validatePositiveQuantity(quantity);

        ensureAvailable(quantity);

        quantityOnHand -= quantity;
    }



    public void returnItems(int quantity){

        validatePositiveQuantity(quantity);

        quantityOnHand += quantity;
    }


    public void transferTo(UUID newHolderMemberId){

        this.holderMemberId =
            Objects.requireNonNull(newHolderMemberId);
    }



    private void ensureAvailable(int quantity){

        if(quantityOnHand < quantity){

            throw new InsufficientQuantityException(
                itemId,
                quantityOnHand,
                quantity
            );
        }
    }



    private static void validateQuantity(int quantity){

        if(quantity < 0){

            throw new InvalidItemQuantityException(
                "Quantity cannot be negative"
            );
        }
    }



    private static void validatePositiveQuantity(int quantity){

        if(quantity <=0){

            throw new InvalidItemQuantityException(
                "Quantity must be greater than zero"
            );
        }
    }



    public UUID getId() {
        return id;
    }


    public UUID getItemId() {
        return itemId;
    }


    public UUID getHolderMemberId() {
        return holderMemberId;
    }


    public int getQuantityOnHand() {
        return quantityOnHand;
    }
}
