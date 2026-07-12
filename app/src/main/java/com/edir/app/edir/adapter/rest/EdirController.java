package com.edir.app.edir.adapter.rest;

import com.edir.app.edir.application.edir.command.RegisterEdirCommand;
import com.edir.app.edir.application.edir.query.EdirQueryService;
import com.edir.app.edir.application.edir.query.EdirView;
import com.edir.app.edir.application.edir.usecase.RegisterEdirUseCase;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import static com.edir.app.shared.EdirConstant.REST_VERSION;

@RestController
@RequestMapping(REST_VERSION + "edir")
public class EdirController {
    private final RegisterEdirUseCase registerEdirUseCase;
    private final EdirQueryService edirQueryService;


    public EdirController(RegisterEdirUseCase registerEdirUseCase,
                          EdirQueryService edirQueryService) {
        this.registerEdirUseCase = registerEdirUseCase;
        this.edirQueryService = edirQueryService;
    }

    @PostMapping
    public ResponseEntity<UUID> registerEdir(@Valid @RequestBody RegisterEdirCommand registerEdirCommand) {
        UUID edirId = registerEdirUseCase.execute(registerEdirCommand);
        return ResponseEntity.status(HttpStatus.CREATED).body(edirId);
    }

    @GetMapping()
    public ResponseEntity<EdirView> getEdir() {
        if (edirQueryService.getEdir().isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(edirQueryService.getEdir().get());
    }

    @PostMapping("/member")
    public ResponseEntity<UUID> registerMember(@Valid @RequestBody RegisterEdirCommand registerEdirCommand) {
        UUID edirId = registerEdirUseCase.execute(registerEdirCommand);
        return ResponseEntity.status(HttpStatus.CREATED).body(edirId);
    }
}
