package com.edir.app.edir.application.edir.query;

import java.util.Optional;

public interface EdirQueryRepository {
    Optional<EdirView> findEdir();
}
