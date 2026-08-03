package com.edir.app.event.application.port.in.usecases;

import com.edir.app.event.application.port.in.command.AddEventItemCommand;
import com.edir.app.event.application.port.in.command.CreateFuneralEventCommand;
import com.edir.app.event.domain.valueobjects.FuneralEventId;

public interface FuneralEventUseCase {
    FuneralEventId addEvent(CreateFuneralEventCommand command);
    void addItemIssue(AddEventItemCommand command);
    void closeFuneralEvent(FuneralEventId funeralEventId);
}
