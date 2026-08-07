package com.edir.app.event.domain.entity;

import com.edir.app.event.domain.events.FuneralClosedEvent;
import com.edir.app.event.domain.exceptions.FuneralAlreadyClosedExceptions;
import com.edir.app.event.domain.valueobjects.FuneralEventId;
import com.edir.app.event.domain.valueobjects.RelationShip;
import com.edir.app.shared.domain.entity.AggregateRoot;
import com.edir.app.shared.domain.event.ItemIssueAddedEvent;
import com.edir.app.shared.domain.exceptions.DomainValidationException;
import com.edir.app.shared.domain.valueobjects.ItemCode;
import com.edir.app.shared.domain.valueobjects.MemberId;
import com.edir.app.shared.domain.valueobjects.Money;

import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

public class FuneralEvent extends AggregateRoot<FuneralEventId> {

    private final String funeralName;
    private final String deceasedPersonFullName;
    private final MemberId mournerId;
    private final String funeralAddress;
    private final Money payOut;
    private final RelationShip relationShip;
    private final ZonedDateTime funeralDate;
    private Boolean isClosed = false;

    private final Set<EventItem> eventItems = new HashSet<>();

    private FuneralEvent(FuneralEventId funeralEventId,
                        ZonedDateTime funeralDate,
                        String funeralName,
                        String deceasedPersonFullName,
                        MemberId mournerId,
                         String funeralAddress,
                        Money payOut,
                        boolean isClosed,
                        RelationShip relationShip,
                        Set<EventItem> eventItems) {
        super(funeralEventId);
        if(funeralDate==null){
            throw new DomainValidationException("Funeral date is required");
        }
        this.funeralDate = funeralDate;

        if(funeralName==null){
            throw new DomainValidationException("Funeral name is required");
        }
        this.funeralName = funeralName;
        if(deceasedPersonFullName==null){
            throw new DomainValidationException("Deceased person full name is required");
        }
        this.deceasedPersonFullName = deceasedPersonFullName;
        this.mournerId = mournerId;
        this.funeralAddress = funeralAddress;
        this.payOut = payOut;
        this.isClosed = isClosed;
        this.relationShip = relationShip;
        this.eventItems.addAll(eventItems);
    }
    private FuneralEvent(FuneralEventId funeralEventId,
                         ZonedDateTime funeralDate,
                         String funeralName,
                         String deceasedPersonFullName,
                         Money payOut,
                         MemberId mournerId,
                         String funeralAddress,
                         RelationShip relationShip) {
        super(funeralEventId);
        this.funeralDate = funeralDate;
        this.funeralName = funeralName;
        this.deceasedPersonFullName = deceasedPersonFullName;
        this.mournerId = mournerId;
        this.payOut = payOut;
        this.funeralAddress = funeralAddress;
        this.relationShip = relationShip;
    }

    public static FuneralEvent addEvent(
        ZonedDateTime funeralDate,
        String funeralName,
        String deceasedPersonFullName,
        MemberId mournerId,
        Money payOut,
        String funeralAddress,
        RelationShip relationShip
    ){
        return new FuneralEvent(
            FuneralEventId.generate(),
            funeralDate,
            funeralName,
            deceasedPersonFullName,
            payOut,
            mournerId,
            funeralAddress,
            relationShip
        );
    }

    public static FuneralEvent rehydrate(
        FuneralEventId funeralEventId,
        ZonedDateTime funeralDate,
        String funeralName,
        String deceasedPersonFullName,
        MemberId mournerId,
        String funeralAddress,
        Money payOut,
        boolean isClosed,
        RelationShip relationShip,
        Set<EventItem> eventItems
    ){
        return new FuneralEvent(
            funeralEventId,
            funeralDate,
            funeralName,
            deceasedPersonFullName,
            mournerId,
            funeralAddress,
            payOut,
            isClosed,
            relationShip,
            eventItems
        );
    }

    public void issueFuneralItem(ItemCode itemCode,
                                 String itemName,
                                 Integer quantity
                                 ){
        if (isClosed){
            throw new FuneralAlreadyClosedExceptions(this.getId());
        }

        eventItems.stream()
            .filter(item -> item.getItemCode()
                .code().equals(itemCode.code()))
            .findFirst()
            .ifPresentOrElse(
                item -> item.addQuantity(quantity),
                () -> eventItems.add(EventItem.addEventItem(
                        itemCode,
                        itemName,
                        quantity,
                        ZonedDateTime.now()
                    ))
            );
        registerEvent(new ItemIssueAddedEvent(this.getId().id(),itemCode,quantity,mournerId,ZonedDateTime.now()));
    }

    public void close(){
        if (this.isClosed) {
            throw new FuneralAlreadyClosedExceptions(this.getId());
        }
        this.isClosed = true;
        registerEvent(new FuneralClosedEvent(this.getId(), ZonedDateTime.now()));
    }

    public ZonedDateTime getFuneralDate() {
        return funeralDate;
    }

    public String getFuneralName() {
        return funeralName;
    }

    public String getDeceasedPersonFullName() {
        return deceasedPersonFullName;
    }

    public MemberId getMournerId() {
        return mournerId;
    }

    public String getFuneralAddress() {
        return funeralAddress;
    }

    public RelationShip getRelationShip() {
        return relationShip;
    }

    public Money getPayOut() {
        return payOut;
    }

    public Boolean getIsClosed() {
        return isClosed;
    }

    public Set<EventItem> getEventItems() {
        return Set.copyOf(eventItems);
    }
}
