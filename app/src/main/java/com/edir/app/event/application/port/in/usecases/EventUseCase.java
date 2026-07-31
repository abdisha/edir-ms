package com.edir.app.event.application.port.in.usecases;

import com.edir.app.event.application.port.in.command.CreateMeetingEventCommand;

public interface EventUseCase {
    void addEvent(CreateMeetingEventCommand command);
}
