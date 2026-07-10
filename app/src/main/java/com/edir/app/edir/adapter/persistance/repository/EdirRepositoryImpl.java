package com.edir.app.edir.adapter.persistance.repository;

import com.edir.app.edir.adapter.persistance.EdirMapper;
import com.edir.app.edir.adapter.persistance.entity.EdirEntity;
import com.edir.app.edir.adapter.persistance.jpa.EdirJpaRepository;
import com.edir.app.edir.domain.entity.Edir;
import com.edir.app.edir.domain.port.out.EdirRepository;
import com.edir.app.edir.domain.valueobjects.EdirId;
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
    public Optional<Edir> findById(EdirId edirId) {
        Optional<EdirEntity> result = edirJpaRepository.findById(edirId.value().toString());
        return result.map(this.edirMapper::edirEntityToEdir);
    }

    @Override
    public Optional<Edir> findAny() {
        return edirJpaRepository.getFirst().map(this.edirMapper::edirEntityToEdir);
    }

    @Override
    public Edir save(Edir edir) {
       return edirMapper
               .edirEntityToEdir(edirJpaRepository
                       .save(edirMapper.edirToEdirEntity(edir)));
    }
}
