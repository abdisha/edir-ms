package com.edir.app.edir.adapter.persistance.converter;

import com.edir.app.shared.domain.valueobjects.Gender;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class GenderConverter implements AttributeConverter<Gender, String> {
    @Override
    public String convertToDatabaseColumn(Gender gender) {
        return gender.getGender();
    }

    @Override
    public Gender convertToEntityAttribute(String s) {
        return Gender.from(s);
    }
}
