package com.edir.app.edir.adapter.persistance.converter;

import com.edir.app.edir.domain.valueobjects.MemberStatus;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class MemberStatusConverter implements AttributeConverter<MemberStatus, String> {
    @Override
    public String convertToDatabaseColumn(MemberStatus memberStatus) {
        return  memberStatus.getValue();
    }

    @Override
    public MemberStatus convertToEntityAttribute(String s) {
        return MemberStatus.from(s);
    }
}
