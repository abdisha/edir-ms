package com.edir.app.event.application.port.in.usecases;

import com.edir.app.event.application.port.in.command.UpInsertMeetingEventCommand;

import java.util.UUID;

public interface EventUseCase {
    UUID addEvent(UpInsertMeetingEventCommand command);

    void updateEvent(UUID meetingId, UpInsertMeetingEventCommand command);
}
