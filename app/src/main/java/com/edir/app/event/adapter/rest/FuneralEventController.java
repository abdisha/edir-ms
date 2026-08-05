package com.edir.app.event.adapter.rest;

import com.edir.app.event.application.port.in.command.AddEventItemCommand;
import com.edir.app.event.application.port.in.command.CreateFuneralEventCommand;
import com.edir.app.event.application.port.in.usecases.FuneralEventUseCase;
import com.edir.app.event.application.port.out.query.FuneralEventQueryService;
import com.edir.app.event.application.port.out.query.FuneralEventView;
import com.edir.app.event.application.port.out.query.ItemIssueView;
import com.edir.app.event.domain.valueobjects.FuneralEventId;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.edir.app.shared.EdirConstant.REST_VERSION;

@AllArgsConstructor
@RestController
@RequestMapping(REST_VERSION+"funeral-events")
class FuneralEventController {
    private final FuneralEventUseCase funeralEventUseCase;
    private final FuneralEventQueryService funeralEventQueryService;

    @PostMapping()
    public ResponseEntity<UUID> post(@Valid  @RequestBody CreateFuneralEventCommand command) {
        var result = funeralEventUseCase.addEvent(command);
        return ResponseEntity.status(HttpStatus.CREATED).body(result.id());
    }

    @PostMapping("/{funeralId}/issue-item")
    public ResponseEntity<Void> addItemIssues(@Valid @RequestBody AddEventItemCommand command){
        funeralEventUseCase.addItemIssue(command);
        return ResponseEntity.ok().build();
    }


    @PutMapping("/{funeralId}/close")
    public ResponseEntity<Void> close(@Valid  @PathVariable UUID funeralId) {
        funeralEventUseCase.closeFuneralEvent(new FuneralEventId(funeralId));
        return ResponseEntity.ok().build();
    }

    @GetMapping()
    public ResponseEntity<List<FuneralEventView>> getFuneralEvents() {
        return ResponseEntity.ok(funeralEventQueryService.findAll());
    }

    @GetMapping("/{funeralId}")
    public ResponseEntity<Optional<FuneralEventView>> getFuneralEventById(@Valid  @PathVariable UUID funeralId) {
        return ResponseEntity.ok(funeralEventQueryService.findById(funeralId));
    }

    @GetMapping("/{funeralId}/issued-item")
    public ResponseEntity<List<ItemIssueView>> getIssuedItems(@Valid  @PathVariable UUID funeralId) {
        return ResponseEntity.ok(funeralEventQueryService.findByFuneralId(funeralId));
    }
}
