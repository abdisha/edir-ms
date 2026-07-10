package com.edir.app.edir.application.edir.query;

import com.edir.app.edir.domain.valueobjects.MemberStatus;

import java.time.ZonedDateTime;
import java.util.UUID;

public record MemberDetailView(
        UUID id,
        String firstName,
        String middleName,
        String lastName,
        Integer age,
        String gender,
        String city,
        String subcity,
        String worda,
        String phoneNumber,
        ZonedDateTime joined,
        ZonedDateTime left,
        MemberStatus memberStatus,
        Boolean isDeceased
        ) {
}
