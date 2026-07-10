package com.edir.app.edir.application.edir;

import com.edir.app.edir.application.edir.command.RegisterEdirCommand;
import com.edir.app.edir.application.edir.usecase.RegisterEdirUseCase;
import com.edir.app.edir.domain.entity.Edir;
import com.edir.app.edir.domain.port.out.EdirRepository;
import com.edir.app.edir.domain.valueobjects.EdirName;
import com.edir.app.shared.domain.valueobjects.Address;
import com.edir.app.shared.domain.valueobjects.PhoneNumber;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Slf4j
@Component
public class RegisterEdirService implements RegisterEdirUseCase {
    private final EdirRepository edirRepository;

    public RegisterEdirService(EdirRepository edirRepository) {
        this.edirRepository = edirRepository;
    }

    @Override
    public UUID execute(RegisterEdirCommand registerEdirCommand) {
        log.info("Setting up edir with edir name: {}", registerEdirCommand.edirName());

        Address address = new Address(
                registerEdirCommand.address().city(),
                registerEdirCommand.address().subcity(),
                registerEdirCommand.address().worda()
        );

        Optional<Edir> result = edirRepository.findAny()
                .map(existingEdir -> {
                    log.info("Edir already exists, updating edir information");
                    existingEdir.updateEdirInformation(new EdirName(registerEdirCommand.edirName()),
                            registerEdirCommand.description(),
                            new PhoneNumber(registerEdirCommand.phoneNumber()),
                            address);
                    return existingEdir;
                });

        if (result.isPresent()) {
            return edirRepository.save(result.get()).getId().value();
        }

       log.info("Creating new Edir with Edir name: {}", registerEdirCommand.edirName());
        return edirRepository.save(
                Edir.register(
                        new EdirName(registerEdirCommand.edirName()),
                        registerEdirCommand.description(),
                        address,
                        new PhoneNumber(registerEdirCommand.phoneNumber())
                )
        ).getId().value();
    }
}
