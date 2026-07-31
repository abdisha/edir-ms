package com.edir.app.event.application.port.out.query;

import java.time.ZonedDateTime;
import java.util.UUID;

public record MeetingView(
    UUID id,
    String meetingName,
    String agenda,
    String location,
    ZonedDateTime eventDate
) {
}
