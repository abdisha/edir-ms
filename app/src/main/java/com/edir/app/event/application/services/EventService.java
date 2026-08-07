package com.edir.app.event.application.services;

import com.edir.app.event.application.exceptions.MeetingEventNotFoundException;
import com.edir.app.event.application.port.in.command.UpInsertMeetingEventCommand;
import com.edir.app.event.application.port.in.usecases.EventUseCase;
import com.edir.app.event.application.port.out.MeetingEventRepository;
import com.edir.app.event.domain.entity.MeetingEvent;
import com.edir.app.event.domain.valueobjects.MeetingEventId;
import com.edir.app.shared.application.usecase.UseCase;
import lombok.AllArgsConstructor;
import org.jspecify.annotations.NonNull;

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
        MeetingEvent event = getMeetingEvent(meetingId);

        event.updateInformation(command.meetingName(), command.agenda(), command.eventDate(), command.location());
        eventRepository.save(event);
    }

    @Override
    public void closeEvent(UUID meetingId) {
        MeetingEvent meetingEvent = getMeetingEvent(meetingId);
        meetingEvent.closeMeeting();
        eventRepository.save(meetingEvent);
    }

    @Override
    public void deleteEvent(UUID meetingId) {
        MeetingEvent meetingEvent = getMeetingEvent(meetingId);
        eventRepository.delete(meetingEvent);
    }

    private MeetingEvent getMeetingEvent(UUID meetingId) {
        return eventRepository
            .findById(new MeetingEventId(meetingId))
            .orElseThrow(() -> new MeetingEventNotFoundException(meetingId));
    }
}
