package com.edir.app.event.domain.entity;

import com.edir.app.event.domain.valueobjects.MeetingEventId;
import com.edir.app.shared.domain.entity.AggregateRoot;
import com.edir.app.shared.domain.exceptions.DomainValidationException;
import jakarta.validation.constraints.NotNull;

import java.time.ZonedDateTime;
import java.util.Objects;

public class MeetingEvent extends AggregateRoot<MeetingEventId> {
    private String meetingName;
    private ZonedDateTime eventDate;
    private String agenda;
    private String location;
    private Boolean isClosed = false;


    private MeetingEvent(MeetingEventId meetingEventId,
                         String meetingName,
                         ZonedDateTime eventDate,
                         String agenda,
                         Boolean isClosed,
                         String location) {
        super(meetingEventId);
        validate(meetingName, eventDate);
        this.meetingName = meetingName;
        this.eventDate = eventDate;
        this.agenda = agenda;
        this.location = location;
        this.isClosed = isClosed;

    }

    public static MeetingEvent meetingEvent(
        String meetingName,
        ZonedDateTime eventDate,
        String agenda,
        String location
    ) {
        return new MeetingEvent(
            MeetingEventId.generate(),
            meetingName,
            eventDate,
            agenda,
            false,
            location
        );
    }


    public static MeetingEvent rehydrate(
        MeetingEventId meetingEventId,
        String meetingName,
        ZonedDateTime eventDate,
        String agenda,
        Boolean isClosed,
        String location
    ) {
        return new MeetingEvent(
            meetingEventId,
            meetingName,
            eventDate,
            agenda,
            isClosed,
            location
        );
    }


    public void closeMeeting(){
        if(isClosed){
            throw new DomainValidationException("Meeting is already closed");
        }
        this.isClosed = true;
    }

    private void validate(String meetingName, ZonedDateTime eventDate) {
        Objects.requireNonNull(meetingName, "Meeting name cannot be null");
        Objects.requireNonNull(eventDate, "Event date cannot be null");
        if (meetingName.isBlank()) {
            throw new DomainValidationException("Meeting name cannot be empty");
        }
    }

    public void updateInformation(@NotNull String meetingName, String agenda, @NotNull ZonedDateTime eventDate, @NotNull String location) {
        validate(meetingName, eventDate);
        if (isClosed) {
            throw new DomainValidationException("Meeting is already closed");
        }
        this.meetingName = meetingName;
        this.eventDate = eventDate;
        this.agenda = agenda;
        this.location = location;
    }

    public String getLocation() {
        return location;
    }

    public String getMeetingName() {
        return meetingName;
    }

    public ZonedDateTime getEventDate() {
        return eventDate;
    }

    public String getAgenda() {
        return agenda;
    }
}
