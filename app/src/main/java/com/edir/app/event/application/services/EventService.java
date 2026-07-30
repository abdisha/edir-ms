package com.edir.app.event.application.services;

import com.edir.app.event.application.port.in.command.CreateMeetingEventCommand;
import com.edir.app.event.application.port.in.usecases.EventUseCase;
import com.edir.app.event.application.port.out.MeetingEventRepository;
import com.edir.app.event.domain.entity.MeetingEvent;
import com.edir.app.shared.application.usecase.UseCase;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@UseCase
class EventService implements EventUseCase {
    private final MeetingEventRepository eventRepository;

    @Override
    public void addEvent(CreateMeetingEventCommand command) {
        MeetingEvent event = MeetingEvent.meetingEvent(
            command.meetingName(),
            command.eventDate(),
            command.agenda(),
            command.location()
        );
        eventRepository.save(event);
    }
}
