package com.edir.app.edir.adapter.rest;

import com.edir.app.edir.application.dto.EdirDto;
import com.edir.app.edir.application.query.EdirView;
import com.edir.app.edir.application.query.GetEdirQuery;
import com.edir.app.edir.application.usecase.SetupEdirUseCase;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v0/edirs")
public class EdirController {
    private final SetupEdirUseCase setupEdirUseCase;
    private final GetEdirQuery getEdirQuery;


    public EdirController(SetupEdirUseCase setupEdirUseCase,
                          GetEdirQuery getEdirQuery) {
        this.setupEdirUseCase = setupEdirUseCase;
        this.getEdirQuery = getEdirQuery;
    }

    @PostMapping
    public ResponseEntity<UUID> registerEdir(@Valid @RequestBody EdirDto edirDto){
       UUID edirId =  setupEdirUseCase.execute(edirDto);
       return ResponseEntity.status(HttpStatus.CREATED).body(edirId);
    }

    @GetMapping()
    public ResponseEntity<EdirView> getEdir(){
        return ResponseEntity.ok(getEdirQuery.execute().get());
    }
}
