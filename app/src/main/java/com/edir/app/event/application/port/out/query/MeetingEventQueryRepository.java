package com.edir.app.event.application.port.out.query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MeetingEventQueryRepository {
    Optional<MeetingView> findByMeetingView(UUID id);
    List<MeetingView> findAll();
}
