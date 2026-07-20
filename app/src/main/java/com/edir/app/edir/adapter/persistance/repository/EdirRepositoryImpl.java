package com.edir.app.edir.adapter.persistance.repository;

import com.edir.app.edir.adapter.persistance.EdirMapper;
import com.edir.app.edir.adapter.persistance.jpa.EdirJpaRepository;
import com.edir.app.edir.domain.entity.Edir;
import com.edir.app.edir.application.ports.out.EdirRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;
@Component
public class EdirRepositoryImpl implements EdirRepository {
    private final EdirJpaRepository edirJpaRepository;
    private final EdirMapper edirMapper;

    public EdirRepositoryImpl(EdirJpaRepository edirJpaRepository,
                              EdirMapper edirMapper) {
        this.edirJpaRepository = edirJpaRepository;
        this.edirMapper = edirMapper;
    }

    @Override
    public Optional<Edir> find() {
        return edirJpaRepository.findFirstBy().map(this.edirMapper::edirEntityToEdir);
    }

    @Override
    public Edir save(Edir edir) {
       return edirMapper
               .edirEntityToEdir(edirJpaRepository
                       .save(edirMapper.edirToEdirEntity(edir)));
    }
}
