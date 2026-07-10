package com.edir.app.edir.adapter.persistance.query;

import com.edir.app.edir.adapter.persistance.jpa.EdirJpaRepository;
import com.edir.app.edir.application.edir.query.EdirQueryRepository;
import com.edir.app.edir.application.edir.query.EdirView;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class EdirQueryRepositoryImpl implements EdirQueryRepository {
    private final EdirJpaRepository jpaRepository;

    public EdirQueryRepositoryImpl(EdirJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public Optional<EdirView> findEdir() {
        return jpaRepository.findEdir();
    }
}
