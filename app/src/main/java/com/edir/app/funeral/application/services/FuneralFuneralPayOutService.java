package com.edir.app.funeral.application.services;

import com.edir.app.funeral.application.exceptions.FuneralEventNotFoundExceptions;
import com.edir.app.funeral.application.port.in.usecases.FuneralPayOutUseCase;
import com.edir.app.funeral.application.port.out.FuneralEventRepository;
import com.edir.app.funeral.domain.entity.FuneralEvent;
import com.edir.app.funeral.domain.valueobjects.FuneralId;
import com.edir.app.shared.domain.valueobjects.Money;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Slf4j
@AllArgsConstructor
@Service
@Transactional
public class FuneralFuneralPayOutService implements FuneralPayOutUseCase {
    private final FuneralEventRepository funeralEventRepository;

    @Override
    public void execute(BigDecimal amount, FuneralId funeralId) {
        FuneralEvent funeralEvent = funeralEventRepository
            .findById(funeralId).orElseThrow(
                () -> new FuneralEventNotFoundExceptions(funeralId)
            );
        funeralEvent.payOut(Money.of(amount));
    }
}
