package com.edir.app.edir.application.ports.out.query;

import java.util.Optional;

public interface EdirQueryRepository {
    Optional<EdirView> findEdir();
}
