package com.edir.app.edir.adapter.rest;

import com.edir.app.edir.application.edir.command.RegisterEdirCommand;
import com.edir.app.edir.application.edir.query.EdirView;
import com.edir.app.edir.application.edir.query.GetEdirQuery;
import com.edir.app.edir.application.edir.usecase.RegisterEdirUseCase;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import static com.edir.app.shared.EdirConstant.REST_VERSION;

@RestController
@RequestMapping(REST_VERSION+"edir")
public class EdirController {
    private final RegisterEdirUseCase registerEdirUseCase;
    private final GetEdirQuery getEdirQuery;


    public EdirController(RegisterEdirUseCase registerEdirUseCase,
                          GetEdirQuery getEdirQuery) {
        this.registerEdirUseCase = registerEdirUseCase;
        this.getEdirQuery = getEdirQuery;
    }

    @PostMapping
    public ResponseEntity<UUID> registerEdir(@Valid @RequestBody RegisterEdirCommand registerEdirCommand){
       UUID edirId =  registerEdirUseCase.execute(registerEdirCommand);
       return ResponseEntity.status(HttpStatus.CREATED).body(edirId);
    }

    @GetMapping()
    public ResponseEntity<EdirView> getEdir(){
        return ResponseEntity.ok(getEdirQuery.execute().get());
    }

    @PostMapping("/member")
    public ResponseEntity<UUID> registerMember(@Valid @RequestBody RegisterEdirCommand registerEdirCommand){
        UUID edirId =  registerEdirUseCase.execute(registerEdirCommand);
        return ResponseEntity.status(HttpStatus.CREATED).body(edirId);
    }
}
