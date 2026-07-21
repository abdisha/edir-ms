package com.edir.app.funeral.application.services;

import com.edir.app.funeral.application.exceptions.FuneralEventNotFoundExceptions;
import com.edir.app.funeral.application.port.in.command.IssueEventItemCommand;
import com.edir.app.funeral.application.port.in.usecases.IssueEventItemUseCase;
import com.edir.app.funeral.application.port.out.FuneralEventRepository;
import com.edir.app.funeral.domain.entity.FuneralEvent;
import com.edir.app.funeral.domain.valueobjects.FuneralId;
import com.edir.app.shared.domain.valueobjects.ItemCode;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@AllArgsConstructor
@Slf4j
@Service
@Transactional
public class IssueEventItemService implements IssueEventItemUseCase {
    private final FuneralEventRepository funeralEventRepository;

    @Override
    public void execute(IssueEventItemCommand itemCommand) {
        FuneralEvent funeralEvent =  funeralEventRepository.findById(new FuneralId(itemCommand.funeralId()))
            .orElseThrow(
                () -> new FuneralEventNotFoundExceptions(new FuneralId(itemCommand.funeralId()))
            );
        funeralEvent.issueFuneralItem(new ItemCode(itemCommand.itemCode())
            ,itemCommand.name(),
            itemCommand.quantity());

    }
}
