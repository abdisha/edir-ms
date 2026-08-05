package com.edir.app.event.adapter.persistance.repository;

import com.edir.app.event.adapter.EventDataMapper;
import com.edir.app.event.adapter.persistance.jpa.JpaMeetingEventRepository;
import com.edir.app.event.application.port.out.MeetingEventRepository;
import com.edir.app.event.application.port.out.query.MeetingEventQueryRepository;
import com.edir.app.event.application.port.out.query.MeetingView;
import com.edir.app.event.domain.entity.MeetingEvent;
import com.edir.app.event.domain.valueobjects.MeetingEventId;
import com.edir.app.shared.adapter.PersistenceAdapter;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@PersistenceAdapter
class MeetingEventRepositoryImpl implements MeetingEventRepository, MeetingEventQueryRepository {
    private final JpaMeetingEventRepository eventRepository;
    private final EventDataMapper mapper;

    @Override
    public void save(MeetingEvent meetingEvent) {
        eventRepository.save(mapper.meetingEventToMeetingEventEntity(meetingEvent));
    }

    @Override
    public Optional<MeetingEvent> findById(MeetingEventId meetingEventId) {
        return eventRepository.findById(meetingEventId.id())
              .map(mapper::meetingEventEntityToDomain);
    }

    @Override
    public Optional<MeetingView> findByMeetingView(UUID id) {
        return eventRepository.findMeetingViewById(id);
    }

    @Override
    public List<MeetingView> findAll() {
        return eventRepository.findAllMeetingView();
    }
}
