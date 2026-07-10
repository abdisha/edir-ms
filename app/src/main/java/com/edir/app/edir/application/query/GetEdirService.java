package com.edir.app.edir.application.query;

import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class GetEdirService implements GetEdirQuery {
   private final EdirQueryRepository edirQueryRepository;

    public GetEdirService(EdirQueryRepository edirQueryRepository) {
        this.edirQueryRepository = edirQueryRepository;
    }

    @Override
    public Optional<EdirView> execute() {
        return edirQueryRepository.findEdir();
    }
}
