package com.edir.app.event.application.services;

import com.edir.app.event.application.exceptions.MeetingEventNotFoundException;
import com.edir.app.event.application.port.in.command.UpInsertMeetingEventCommand;
import com.edir.app.event.application.port.in.usecases.EventUseCase;
import com.edir.app.event.application.port.out.MeetingEventRepository;
import com.edir.app.event.domain.entity.MeetingEvent;
import com.edir.app.event.domain.valueobjects.MeetingEventId;
import com.edir.app.shared.application.usecase.UseCase;
import lombok.AllArgsConstructor;

import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@UseCase
class EventService implements EventUseCase {
    private final MeetingEventRepository eventRepository;

    @Override
    public UUID addEvent(UpInsertMeetingEventCommand command) {
        MeetingEvent event = MeetingEvent.meetingEvent(
            command.meetingName(),
            command.eventDate(),
            command.agenda(),
            command.location()
        );
        eventRepository.save(event);
        return event.getId().id();
    }

    @Override
    public void updateEvent(UUID meetingId, UpInsertMeetingEventCommand command) {
        Optional<MeetingEvent> result = eventRepository.findById(new MeetingEventId(meetingId));
        if (result.isEmpty()) {
            throw new MeetingEventNotFoundException(meetingId);
        }
        MeetingEvent event = result.get();

        event.updateInformation(command.meetingName(), command.eventDate(), command.location());
        eventRepository.save(event);
    }
}
