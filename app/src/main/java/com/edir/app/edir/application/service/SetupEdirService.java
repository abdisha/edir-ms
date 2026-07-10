package com.edir.app.edir.application.service;

import com.edir.app.edir.application.dto.EdirDto;
import com.edir.app.edir.application.usecase.SetupEdirUseCase;
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
public class SetupEdirService implements SetupEdirUseCase {
   private final EdirRepository edirRepository;

    public SetupEdirService(EdirRepository edirRepository) {
        this.edirRepository = edirRepository;
    }

    @Override
    public UUID execute(EdirDto edirDto) {
        log.info("Setting up edir with edir name: {}",edirDto.edirName());

        Optional<Edir> result = edirRepository.findAny();
        if (result.isPresent()){
            log.info("Edir already exists, updating edir information");
            Edir edir = result.get();

            edir.updateEdirInformation(edirDto.)

        }

        Edir edir = Edir.register(
                new EdirName(edirDto.edirName()),
                edirDto.description(),
                new Address(
                        edirDto.address().city(),
                        edirDto.address().subcity(),
                        edirDto.address().worda()
                ),
                new PhoneNumber(edirDto.phoneNumber())
        );
        return edirRepository.save(edir).getId().value();
    }
}
