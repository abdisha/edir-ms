package com.edir.app.edir.application.query;

import com.edir.app.edir.domain.valueobjects.MemberStatus;
import com.edir.app.shared.domain.valueobjects.Gender;

import java.time.ZonedDateTime;
import java.util.UUID;

public record MemberDetailView(
        UUID id,
        String firstName,
        String middleName,
        String lastName,
        Integer age,
        Gender gender,
        String city,
        String subcity,
        String worda,
        String phoneNumber,
        ZonedDateTime joinedDate,
        ZonedDateTime leftDate,
        MemberStatus memberStatus,
        Boolean isDeceased
        ) {
}
