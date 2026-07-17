package com.edir.app.edir.adapter.rest;

import com.edir.app.edir.application.ports.in.commands.UpInsertEdirCommand;
import com.edir.app.edir.application.ports.out.query.EdirQueryService;
import com.edir.app.edir.application.ports.out.query.EdirView;
import com.edir.app.edir.application.ports.in.usecases.UpInsertEdirUseCase;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

import static com.edir.app.shared.EdirConstant.REST_VERSION;

@RestController
@RequestMapping(REST_VERSION + "edir")
@AllArgsConstructor
public class EdirController {
    private final UpInsertEdirUseCase upInsertEdirUseCase;
    private final EdirQueryService edirQueryService;


    @PostMapping
    public ResponseEntity<UUID> registerEdir(@Valid @RequestBody UpInsertEdirCommand upInsertEdirCommand) {
        UUID edirId = upInsertEdirUseCase.execute(upInsertEdirCommand);
        return ResponseEntity.status(HttpStatus.CREATED).body(edirId);
    }

    @PutMapping()
    public ResponseEntity<UUID> updateEdirInformation(@Valid @RequestBody UpInsertEdirCommand upInsertEdirCommand){
        UUID edirId = upInsertEdirUseCase.execute(upInsertEdirCommand);
        return ResponseEntity.status(HttpStatus.OK).body(edirId);
    }

    @GetMapping()
    public ResponseEntity<Optional<EdirView>> getEdir() {
        return ResponseEntity.status(HttpStatus.OK).body(edirQueryService.getEdir());
    }
}
