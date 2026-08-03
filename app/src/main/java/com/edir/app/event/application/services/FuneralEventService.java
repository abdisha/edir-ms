package com.edir.app.event.application.services;

import com.edir.app.event.application.exceptions.FuneralEventNotFoundExceptions;
import com.edir.app.event.application.port.in.command.AddEventItemCommand;
import com.edir.app.event.application.port.in.command.CreateFuneralEventCommand;
import com.edir.app.event.application.port.in.usecases.FuneralEventUseCase;
import com.edir.app.event.application.port.out.FuneralEventRepository;
import com.edir.app.event.domain.entity.FuneralEvent;
import com.edir.app.event.domain.valueobjects.FuneralEventId;
import com.edir.app.shared.application.usecase.UseCase;
import com.edir.app.shared.domain.event.DomainEventPublisher;
import com.edir.app.shared.domain.valueobjects.ItemCode;
import com.edir.app.shared.domain.valueobjects.MemberId;
import com.edir.app.shared.domain.valueobjects.Money;
import lombok.AllArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@AllArgsConstructor
@Transactional
@UseCase
class FuneralEventService implements FuneralEventUseCase {
    private final FuneralEventRepository repository;
    private final DomainEventPublisher publisher;

    @Override
    public FuneralEventId addEvent(CreateFuneralEventCommand command) {
        FuneralEvent funeralEvent = FuneralEvent.addEvent(
            command.funeralDate(),
            command.funeralName(),
            command.deceasedPersonFullName(),
            new MemberId(command.memberId()),
            Money.of(command.payout()),
            command.funeralAddress(),
            command.relationShip()
        );
        return new FuneralEventId(repository.save(funeralEvent));
    }

    @Override
    public void addItemIssue(AddEventItemCommand command) {
        Optional<FuneralEvent> funeralEventOptional = repository
            .findById(new FuneralEventId(command.funeralId()));

        funeralEventOptional.ifPresentOrElse(funeralEvent -> funeralEvent.issueFuneralItem(
                new ItemCode(command.itemCode()),
                command.name(),
                command.quantity()),
            () -> {
                throw new FuneralEventNotFoundExceptions(new FuneralEventId(command.funeralId()));
            });

        publisher.publishEvent(funeralEventOptional.get());
        repository.save(funeralEventOptional.get());
    }

    @Override
    public void closeFuneralEvent(FuneralEventId funeralEventId) {
        Optional<FuneralEvent> funeralEventOptional = repository.findById(funeralEventId);
        funeralEventOptional.ifPresent(FuneralEvent::close);

        publisher.publishEvent(funeralEventOptional.get());
        repository.save(funeralEventOptional.get());
    }
}
