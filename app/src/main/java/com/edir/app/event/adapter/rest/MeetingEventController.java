package com.edir.app.event.adapter.rest;

import com.edir.app.event.application.port.in.command.CreateMeetingEventCommand;
import com.edir.app.event.application.port.in.usecases.EventUseCase;
import com.edir.app.event.application.port.out.query.MeetingEventQueryRepository;
import com.edir.app.event.application.port.out.query.MeetingView;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.edir.app.shared.EdirConstant.REST_VERSION;

@AllArgsConstructor
@RestController
@RequestMapping(REST_VERSION+"meeting-event")
class MeetingEventController {
    private final EventUseCase eventUseCase;
    private final MeetingEventQueryRepository meetingEventQueryRepository;

    @PostMapping()
    public ResponseEntity<Void> createEvent( @Valid  @RequestBody CreateMeetingEventCommand createMeetingEventCommand) {
        eventUseCase.addEvent(createMeetingEventCommand);
        return ResponseEntity.ok().build();
    }

    @GetMapping("")
    public ResponseEntity<List<MeetingView>> getMeetingView() {
        return ResponseEntity.ok(meetingEventQueryRepository.findAll());
    }
    @GetMapping("/{meetingId}")
    public ResponseEntity<Optional<MeetingView>> getMeetingViewById(@PathVariable UUID meetingId) {
        return ResponseEntity.ok(meetingEventQueryRepository.findByMeetingView(meetingId));
    }
}
