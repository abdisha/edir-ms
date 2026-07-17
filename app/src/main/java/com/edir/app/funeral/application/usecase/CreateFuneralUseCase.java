package com.edir.app.funeral.application.usecase;

import com.edir.app.funeral.application.command.CreateFuneralEventCommand;

import java.util.UUID;

public interface CreateFuneralUseCase {
    UUID execute(CreateFuneralEventCommand command);
}
