package com.edir.app.edir.application.query;

import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class EdirQueryService  {
   private final EdirQueryRepository edirQueryRepository;

    public EdirQueryService(EdirQueryRepository edirQueryRepository) {
        this.edirQueryRepository = edirQueryRepository;
    }

    public Optional<EdirView> getEdir() {
        return edirQueryRepository.findEdir();
    }
}
