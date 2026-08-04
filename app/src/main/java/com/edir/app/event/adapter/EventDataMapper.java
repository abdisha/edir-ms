package com.edir.app.event.adapter;

import com.edir.app.event.adapter.persistance.entity.EventItemEntity;
import com.edir.app.event.adapter.persistance.entity.FuneralEventEntity;
import com.edir.app.event.adapter.persistance.entity.MeetingEventEntity;
import com.edir.app.event.domain.entity.EventItem;
import com.edir.app.event.domain.entity.FuneralEvent;
import com.edir.app.event.domain.entity.MeetingEvent;
import com.edir.app.event.domain.valueobjects.EventItemId;
import com.edir.app.event.domain.valueobjects.FuneralEventId;
import com.edir.app.event.domain.valueobjects.MeetingEventId;
import com.edir.app.shared.domain.valueobjects.ItemCode;
import com.edir.app.shared.domain.valueobjects.MemberId;
import com.edir.app.shared.domain.valueobjects.Money;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class EventDataMapper {

    public FuneralEvent funeralEventEntityToDomain(FuneralEventEntity entity) {
        return FuneralEvent.rehydrate(
            new FuneralEventId(entity.getFuneralEventId()),
            entity.getFuneralDate(),
            entity.getName(),
            entity.getDeceasedPersonFullName(),
            new MemberId(entity.getMournerId()),
            entity.getDeceasedPersonAddress(),
            Money.of(entity.getPayOut()),
            entity.getIsClosed(),
            entity.getRelationShip(),
            eventItemEntityToEventItem(entity.getItemEntities())
        );
    }

    public FuneralEventEntity funeralEventToFuneralEventEntity(FuneralEvent edirEvent) {
        FuneralEventEntity eventEntity = FuneralEventEntity.builder()
            .funeralEventId(edirEvent.getId().id())
            .name(edirEvent.getFuneralName())
            .deceasedPersonAddress(edirEvent.getFuneralAddress())
            .deceasedPersonFullName(edirEvent.getDeceasedPersonFullName())
            .funeralDate(edirEvent.getFuneralDate())
            .mournerId(edirEvent.getMournerId().value())
            .payOut(edirEvent.getPayOut().amount())
            .relationShip(edirEvent.getRelationShip())
            .payOutDate(edirEvent.getFuneralDate())
            .isClosed(edirEvent.getIsClosed())
            .build();
        eventEntity.setItemEntities(eventItemToEventItemEntity(edirEvent.getEventItems(), eventEntity));
        return eventEntity;

    }

    private List<EventItemEntity> eventItemToEventItemEntity(Set<EventItem> lendOutItems, FuneralEventEntity entity) {
        return lendOutItems.stream().map(
            item -> EventItemEntity.builder()
                .id(item.getId().id())
                .itemCode(item.getItemCode().code())
                .funeralEvent(entity)
                .name(item.getName())
                .quantity(item.getQuantity())
                .returnedQuantity(item.getReturnedQuantity())
                .issuedDate(item.getIssuedDate())
                .status(item.getStatus())
                .build()
        ).collect(Collectors.toList()
        );
    }

    public MeetingEventEntity meetingEventToMeetingEventEntity(MeetingEvent meetingEvent) {
        return MeetingEventEntity.builder()
            .id(meetingEvent.getId().id())
            .name(meetingEvent.getMeetingName())
            .agenda(meetingEvent.getAgenda())
            .location(meetingEvent.getLocation())
            .eventDate(meetingEvent.getEventDate())
            .build();
    }

    public MeetingEvent meetingEventEntityToDomain(MeetingEventEntity entity) {
        return MeetingEvent.rehydrate(
            new MeetingEventId(entity.getId()),
            entity.getName(),
            entity.getEventDate(),
            entity.getAgenda(),
            entity.getLocation()
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
