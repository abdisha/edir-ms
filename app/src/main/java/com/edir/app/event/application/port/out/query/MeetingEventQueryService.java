package com.edir.app.event.application.port.out.query;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Component
public class MeetingEventQueryService {
    private MeetingEventQueryRepository meetingEventQueryRepository;

    public List<MeetingView> findAll(){
        return  meetingEventQueryRepository.findAll();
    }

    public Optional<MeetingView> findById(UUID id){
        return meetingEventQueryRepository.findByMeetingView(id);
    }
}
