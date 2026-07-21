package com.edir.app.edir.application.services;

import com.edir.app.edir.application.ports.in.commands.UpInsertEdirCommand;
import com.edir.app.edir.application.ports.in.usecases.UpInsertEdirUseCase;
import com.edir.app.edir.application.ports.out.EdirRepository;
import com.edir.app.edir.domain.entity.Edir;
import com.edir.app.edir.domain.valueobjects.EdirName;
import com.edir.app.shared.domain.valueobjects.Address;
import com.edir.app.shared.domain.valueobjects.PhoneNumber;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

/**
 * Register new edir or update edir information
 *
 */
@Slf4j
@Component
public class UpInsertEdirService implements UpInsertEdirUseCase {
    private final EdirRepository edirRepository;

    public UpInsertEdirService(EdirRepository edirRepository) {
        this.edirRepository = edirRepository;
    }

    @Override
    public UUID execute(UpInsertEdirCommand upInsertEdirCommand) {
        log.info("Setting up edir with edir name: {}", upInsertEdirCommand.edirName());

        Address address = new Address(
                upInsertEdirCommand.address().city(),
                upInsertEdirCommand.address().subcity(),
                upInsertEdirCommand.address().woreda()
        );

        Optional<Edir> result = edirRepository.find()
                .map(existingEdir -> {
                    log.info("Edir already exists, updating edir information");
                    existingEdir.updateEdirInformation(new EdirName(upInsertEdirCommand.edirName()),
                            upInsertEdirCommand.description(),
                            new PhoneNumber(upInsertEdirCommand.phoneNumber()),
                            address);
                    return existingEdir;
                });

        if (result.isPresent()) {
            return edirRepository.save(result.get()).getId().value();
        }

       log.info("Creating new Edir with Edir name: {}", upInsertEdirCommand.edirName());
        return edirRepository.save(
                Edir.register(
                        new EdirName(upInsertEdirCommand.edirName()),
                        upInsertEdirCommand.establishedDate(),
                        upInsertEdirCommand.description(),
                        address,
                        new PhoneNumber(upInsertEdirCommand.phoneNumber())
                )
        ).getId().value();
    }
}
