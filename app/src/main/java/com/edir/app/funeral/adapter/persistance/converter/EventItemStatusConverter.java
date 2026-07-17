package com.edir.app.funeral.adapter.persistance.converter;

import com.edir.app.funeral.domain.valueobjects.EventItemStatus;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class EventItemStatusConverter implements AttributeConverter<EventItemStatus,String> {
    @Override
    public String convertToDatabaseColumn(EventItemStatus eventItemStatus) {
        return eventItemStatus.getValue();
    }

    @Override
    public EventItemStatus convertToEntityAttribute(String s) {
        return EventItemStatus.from(s);
    }
}
