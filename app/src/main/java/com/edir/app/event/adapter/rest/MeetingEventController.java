package com.edir.app.event.adapter.rest;

import com.edir.app.event.application.port.in.command.UpInsertMeetingEventCommand;
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
    public ResponseEntity<UUID> createEvent(@Valid  @RequestBody UpInsertMeetingEventCommand upInsertMeetingEventCommand) {
      var id=   eventUseCase.addEvent(upInsertMeetingEventCommand);
        return ResponseEntity.ok().body(id);
    }

    @PostMapping("/{meetingId}/close")
    public ResponseEntity<Void> closeEvent(@PathVariable UUID meetingId) {
        eventUseCase.closeEvent(meetingId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{meetingId}")
    public ResponseEntity<Void> updateEvent(@PathVariable UUID meetingId, @RequestBody UpInsertMeetingEventCommand command){
         eventUseCase.updateEvent(meetingId, command);
        return ResponseEntity.ok().build();
    }

    @GetMapping()
    public ResponseEntity<List<MeetingView>> getMeetingView() {
        return ResponseEntity.ok(meetingEventQueryRepository.findAll());
    }

    @GetMapping("/{meetingId}")
    public ResponseEntity<Optional<MeetingView>> getMeetingViewById(@PathVariable UUID meetingId) {
        return ResponseEntity.ok(meetingEventQueryRepository.findByMeetingView(meetingId));
    }


    @DeleteMapping("/{meetingId}")
    public ResponseEntity<Void> deleteMeeting(@PathVariable UUID meetingId) {
        eventUseCase.deleteEvent(meetingId);
        return ResponseEntity.ok().build();
    }
}
