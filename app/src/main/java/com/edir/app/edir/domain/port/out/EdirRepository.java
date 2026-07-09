package com.edir.app.edir.domain.port.out;

import com.edir.app.edir.domain.entity.Edir;
import com.edir.app.edir.domain.valueobjects.EdirId;

import java.util.Optional;

public interface EdirRepository{
    Optional<Edir> findById(EdirId edirId);
    Edir save(Edir edir);
}
