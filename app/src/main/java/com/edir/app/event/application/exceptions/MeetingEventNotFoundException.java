package com.edir.app.event.application.exceptions;

import com.edir.app.shared.ApplicationException;

import java.util.UUID;

public class MeetingEventNotFoundException extends ApplicationException {
    public MeetingEventNotFoundException(UUID meetingId) {
        super("Meeting event with id " + meetingId + " not found");
    }
}
