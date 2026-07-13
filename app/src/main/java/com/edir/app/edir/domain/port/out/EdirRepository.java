package com.edir.app.edir.domain.port.out;

import com.edir.app.edir.domain.entity.Edir;

import java.util.Optional;

public interface EdirRepository{
    Optional<Edir> find();
    Edir save(Edir edir);
}
