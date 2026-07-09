package com.edir.app.edir.application.usecase;

import com.edir.app.edir.application.dto.EdirDto;

import java.util.UUID;

public interface SetupEdirUseCase {
    UUID registerEdir(EdirDto edirDto);
}
