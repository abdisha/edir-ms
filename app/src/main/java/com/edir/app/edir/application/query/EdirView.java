package com.edir.app.edir.application.query;

import java.time.ZonedDateTime;
import java.util.UUID;

public record EdirView(UUID uuid,
                       String edirName,
                       String description,
                       String city,
                       String subcity,
                       String worda,
                       ZonedDateTime establishedDate,
                       String phoneNumber,
                       Long membersCount

) {
}
