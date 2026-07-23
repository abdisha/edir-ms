package com.edir.app.inventory.adapter.persistance.converter;

import com.edir.app.inventory.domain.valueobjects.ItemStatus;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class ItemStatusConverter implements AttributeConverter<ItemStatus, String> {
    @Override
    public String convertToDatabaseColumn(ItemStatus attribute) {
        return attribute.getValue();
    }

    @Override
    public ItemStatus convertToEntityAttribute(String dbData) {
        return ItemStatus.from(dbData);
    }
}
