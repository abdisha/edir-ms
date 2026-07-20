package com.edir.app.funeral.application.services;

import com.edir.app.funeral.application.port.in.command.CreateFuneralEventCommand;
import com.edir.app.funeral.application.port.in.usecases.AddFuneralUseCase;
import com.edir.app.funeral.application.port.out.FuneralEventRepository;
import com.edir.app.funeral.domain.entity.FuneralEvent;
import com.edir.app.shared.domain.valueobjects.MemberId;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Slf4j
@AllArgsConstructor
@Transactional
@Service
public class AddFuneralEventService implements AddFuneralUseCase {
    private final FuneralEventRepository funeralEventRepository;

    @Override
    public UUID execute(CreateFuneralEventCommand command) {
        return funeralEventRepository.save(
            FuneralEvent.addEvent(
                command.name(),
                command.funeralDate(),
                new MemberId(command.memberId())
            ));
    }
}
