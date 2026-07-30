package com.edir.app.event.application.port.out;

import com.edir.app.event.domain.entity.MeetingEvent;
import com.edir.app.event.domain.valueobjects.MeetingEventId;

import java.util.Optional;

public interface MeetingEventRepository {
    void save(MeetingEvent meetingEvent);
    Optional<MeetingEvent> findById(MeetingEventId meetingEventId);
}
