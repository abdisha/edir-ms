package com.edir.app.funeral.adapter;

import com.edir.app.funeral.adapter.persistance.EventItemEntity;
import com.edir.app.funeral.adapter.persistance.FuneralEventEntity;
import com.edir.app.funeral.domain.entity.EventItem;
import com.edir.app.funeral.domain.entity.FuneralEvent;
import com.edir.app.funeral.domain.valueobjects.EventItemId;
import com.edir.app.funeral.domain.valueobjects.FuneralId;
import com.edir.app.shared.domain.valueobjects.ItemCode;
import com.edir.app.shared.domain.valueobjects.MemberId;
import com.edir.app.shared.domain.valueobjects.Money;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class FuneralDataMapper {

    public FuneralEvent funeralEventEntityToDomain(FuneralEventEntity entity) {
        return FuneralEvent.rehydrate(
            new FuneralId(entity.getFuneralEventId()),
            entity.getName(),
            entity.getFuneralDate(),
            new MemberId(entity.getMournerId()),
            Money.of(entity.getPayOut()),
            entity.getPayOutDate(),
            entity.getIsClosed(),
            eventItemEntityToEventItem(entity.getItemEntities())
        );
    }

    public FuneralEventEntity funeralEventToFuneralEventEntity(FuneralEvent funeralEvent){
        return FuneralEventEntity.builder()
            .funeralEventId(funeralEvent.getId().id())
            .name(funeralEvent.getName())
            .funeralDate(funeralEvent.getFuneralDate())
            .mournerId(funeralEvent.getMournerId().value())
            .payOut(funeralEvent.getPayOut().amount())
            .payOutDate(funeralEvent.getPayOutDate())
            .isClosed(funeralEvent.getClosed())
            .itemEntities(eventItemToEventItemEntity(funeralEvent.getLendOutItems()))
            .build();

    }

    private List<EventItemEntity> eventItemToEventItemEntity(Set<EventItem> lendOutItems) {
        return lendOutItems.stream().map(
            item -> EventItemEntity.builder()
                .id(item.getId().id())
                .itemCode(item.getItemCode().code())
                .name(item.getName())
                .quantity(item.getQuantity())
                .returnedQuantity(item.getReturnedQuantity())
                .issuedDate(item.getIssuedDate())
                .status(item.getStatus())
                .build()
        ).collect(Collectors.toList()
        );
    }

    private Set<EventItem> eventItemEntityToEventItem(List<EventItemEntity> itemEntities) {
        return itemEntities.stream().map(
            entity -> EventItem.rehydrate(
                new EventItemId(entity.getId()),
                new ItemCode(entity.getItemCode()),
                entity.getName(),
                entity.getQuantity(),
                entity.getReturnedQuantity(),
                entity.getStatus(),
                entity.getIssuedDate()
            )
        ).collect(Collectors.toSet());
    }
}
