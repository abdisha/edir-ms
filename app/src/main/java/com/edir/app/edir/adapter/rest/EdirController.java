package com.edir.app.edir.adapter.rest;

import com.edir.app.edir.application.dto.EdirDto;
import com.edir.app.edir.application.usecase.SetupEdirUseCase;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EdirController {
    private final SetupEdirUseCase setupEdirUseCase;

    public EdirController(SetupEdirUseCase setupEdirUseCase) {
        this.setupEdirUseCase = setupEdirUseCase;
    }

    @PostMapping
    public void registerEdir(@RequestBody @Valid EdirDto edirDto){
        setupEdirUseCase.registerEdir(edirDto);
    }
}
