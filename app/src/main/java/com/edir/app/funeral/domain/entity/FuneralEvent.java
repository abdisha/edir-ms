package com.edir.app.funeral.domain.entity;

import com.edir.app.funeral.domain.exceptions.FuneralAlreadyClosedExceptions;
import com.edir.app.funeral.domain.exceptions.FuneralEventCannotBeClosedException;
import com.edir.app.funeral.domain.valueobjects.EventItemStatus;
import com.edir.app.funeral.domain.valueobjects.FuneralId;
import com.edir.app.shared.domain.entity.AggregateRoot;
import com.edir.app.shared.domain.valueobjects.ItemCode;
import com.edir.app.shared.domain.valueobjects.MemberId;
import com.edir.app.shared.domain.valueobjects.Money;

import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;


public class FuneralEvent extends AggregateRoot<FuneralId> {
    private final String name;
    private final ZonedDateTime funeralDate;
    private final MemberId mournerId;
    private Money payOut;
    private ZonedDateTime payOutDate;
    private Boolean isClosed;
    private final Set<EventItem> lendOutItems = new HashSet<>();

    private FuneralEvent(FuneralId funeralId,
                         String name,
                         ZonedDateTime funeralDate,
                         MemberId mournerId,
                         Money payOut,
                         ZonedDateTime payOutDate,
                         Boolean isClosed, Set<EventItem> lendOutItems) {
        super(funeralId);
        this.name = Objects.requireNonNull(name, "Name cannot be null");
        this.funeralDate = Objects.requireNonNull(funeralDate, "Funeral date cannot be null");
        this.mournerId = Objects.requireNonNull(mournerId, "Mourner id cannot be null");
        this.payOut = payOut != null ? payOut : Money.zero();
        this.payOutDate = payOutDate != null ? payOutDate : ZonedDateTime.now();
        this.isClosed = isClosed != null ? isClosed : false;
    }

    private FuneralEvent(FuneralId funeralId,
                         String name,
                         ZonedDateTime funeralDate,
                         MemberId mournerId) {
        super(funeralId);
        this.name = Objects.requireNonNull(name, "Name cannot be null");
        this.funeralDate = Objects.requireNonNull(funeralDate, "Funeral date cannot be null");
        this.mournerId = Objects.requireNonNull(mournerId, "Mourner id cannot be null");
        this.payOut = Objects.requireNonNull(payOut, "Give out cannot be null");
        this.payOutDate = Objects.requireNonNull(payOutDate, "Given out date cannot be null");
        this.isClosed = Objects.requireNonNull(isClosed, "Is closed cannot be null");
    }

    public static FuneralEvent addEvent(String name,
                                        ZonedDateTime funeralDate,
                                        MemberId mournerId) {
        return new FuneralEvent(
            FuneralId.generate(),
            name,
            funeralDate, mournerId);
    }

    public static FuneralEvent rehydrate(
        FuneralId funeralId,
        String name,
        ZonedDateTime funeralDate,
        MemberId mournerId,
        Money giveOut,
        ZonedDateTime givenOutDate,
        Boolean isClosed,
        Set<EventItem> lendOutItems
    ) {
        return new FuneralEvent(
            funeralId,
            name,
            funeralDate,
            mournerId,
            giveOut,
            givenOutDate,
            isClosed,
            lendOutItems
        );
    }

    public void issueFuneralItem(ItemCode code,
                                 String name,
                                 Integer quantity) {

        if (isClosed){
            throw new FuneralAlreadyClosedExceptions(getId());
        }

        EventItem existingItem = lendOutItems.stream()
            .filter(item -> item.getItemCode().code().equals(code.code()))
            .findFirst()
            .orElse(null);

        if (existingItem != null) {
            existingItem.addQuantity(quantity);
        } else {
            lendOutItems
                .add(EventItem
                    .addEventItem(code,
                        name,
                        quantity,
                        ZonedDateTime.now()));
        }
    }

    public void returnFuneralItem(ItemCode code, Integer quantity) {
        EventItem existingItem = lendOutItems
            .stream()
            .filter(item -> item.getItemCode().code().equals(code.code()))
            .findFirst().orElse(null);

        if (existingItem != null) {
            existingItem.returnItem(quantity);
        }

        assert existingItem != null;
        if (existingItem.getRemainingQuantity() == 0) {
            existingItem.markAsReturned();
        }
    }

    public void payOut(Money amount) {
        if(isClosed){
            throw new FuneralAlreadyClosedExceptions(getId());
        }

        this.payOut = amount;
        this.payOutDate = ZonedDateTime.now();

    }

    public void closeFuneralEvent() {
        if (!isAllItemsReturned()) {
            throw new FuneralEventCannotBeClosedException("All items must be returned before closing");
        }
        isClosed = true;
    }

    private boolean isAllItemsReturned() {
        return lendOutItems.stream().allMatch(item -> item.getRemainingQuantity() == 0);
    }

    public String getName() {
        return name;
    }

    public ZonedDateTime getFuneralDate() {
        return funeralDate;
    }

    public MemberId getMournerId() {
        return mournerId;
    }

    public Money getPayOut() {
        return payOut;
    }

    public ZonedDateTime getPayOutDate() {
        return payOutDate;
    }

    public Boolean getClosed() {
        return isClosed;
    }

    public Set<EventItem> getLendOutItems() {
        return Set.copyOf(lendOutItems);
    }
}
