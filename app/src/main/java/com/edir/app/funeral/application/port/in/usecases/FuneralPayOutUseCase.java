package com.edir.app.funeral.application.port.in.usecases;

import com.edir.app.funeral.domain.valueobjects.FuneralId;

import java.math.BigDecimal;

public interface FuneralPayOutUseCase {
    void execute(BigDecimal amount, FuneralId funeralId);
}
