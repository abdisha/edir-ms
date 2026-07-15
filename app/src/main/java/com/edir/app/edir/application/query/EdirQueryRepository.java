package com.edir.app.edir.application.query;

import java.util.Optional;

public interface EdirQueryRepository {
    Optional<EdirView> findEdir();
}
