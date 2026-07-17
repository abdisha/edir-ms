package com.edir.app.funeral.domain.entity;

import com.edir.app.funeral.domain.exceptions.ReturnedExceedsActualQuantityException;
import com.edir.app.funeral.domain.valueobjects.EventItemId;
import com.edir.app.funeral.domain.valueobjects.EventItemStatus;
import com.edir.app.shared.domain.entity.BaseEntity;
import com.edir.app.shared.domain.valueobjects.ItemCode;

import java.time.ZonedDateTime;
import java.util.Objects;

public class EventItem extends BaseEntity<EventItemId> {
    private final ItemCode itemCode;
    private final String name;
    private Integer quantity;
    private EventItemStatus status;
    private Integer returnedQuantity;
    private final ZonedDateTime issuedDate;

    private EventItem(EventItemId eventItemId,
                      ItemCode itemCode,
                      String name,
                      Integer quantity,
                      ZonedDateTime issuedDate) {
        super(eventItemId);
        this.itemCode = Objects.requireNonNull(itemCode, "ItemCode cannot be null");
        this.name = Objects.requireNonNull(name, "Name cannot be null");
        this.quantity = Objects.requireNonNull(quantity, "Quantity cannot be null");
        this.issuedDate = Objects.requireNonNull(issuedDate, "Issued date cannot be null");
        this.returnedQuantity = 0;
        this.status = EventItemStatus.ISSUED;
    }

    public static EventItem addEventItem(ItemCode itemCode,
                                         String name,
                                         Integer quantity,
                                         ZonedDateTime issuedDate) {
        return new EventItem(EventItemId.generate(),
            itemCode,
            name,
            quantity,
            issuedDate);
    }

    public static EventItem rehydrate(EventItemId eventItemId,
                                      ItemCode itemCode,
                                      String name,
                                      Integer quantity,
                                      ZonedDateTime issuedDate) {

        return new EventItem(eventItemId,
            itemCode,
            name,
            quantity,
            issuedDate);
    }

    public void returnItem(Integer quantity) {
        if (quantity < returnedQuantity) {
            throw new ReturnedExceedsActualQuantityException(itemCode);
        }
        this.returnedQuantity = quantity;
        if(this.returnedQuantity == this.quantity){
            this.status = EventItemStatus.RETURNED;
        }
    }


    public Integer getRemainingQuantity() {
        return quantity - returnedQuantity;
    }

    public Integer getReturnedQuantity() {
        return returnedQuantity;
    }

    public ItemCode getItemCode() {
        return itemCode;
    }

    public String getName() {
        return name;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public ZonedDateTime getIssuedDate() {
        return issuedDate;
    }

    public void addQuantity(Integer quantity) {
        this.quantity += quantity;
    }

    public void markAsReturned() {
        this.returnedQuantity=this.quantity;
        this.status = EventItemStatus.RETURNED;
    }
}
