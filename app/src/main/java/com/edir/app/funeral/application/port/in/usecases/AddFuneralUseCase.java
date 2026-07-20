package com.edir.app.funeral.application.port.in.usecases;

import com.edir.app.funeral.application.port.in.command.CreateFuneralEventCommand;

import java.util.UUID;

public interface AddFuneralUseCase {
    UUID execute(CreateFuneralEventCommand command);
}
