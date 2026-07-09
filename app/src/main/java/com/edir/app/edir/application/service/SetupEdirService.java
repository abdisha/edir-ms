package com.edir.app.edir.application.service;

import com.edir.app.edir.application.dto.EdirDto;
import com.edir.app.edir.application.usecase.SetupEdirUseCase;
import com.edir.app.edir.domain.entity.Edir;
import com.edir.app.edir.domain.port.out.EdirRepository;
import com.edir.app.edir.domain.valueobjects.EdirName;
import com.edir.app.shared.domain.valueobjects.Address;
import com.edir.app.shared.domain.valueobjects.PhoneNumber;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class SetupEdirService implements SetupEdirUseCase {
   private final EdirRepository edirRepository;

    public SetupEdirService(EdirRepository edirRepository) {
        this.edirRepository = edirRepository;
    }

    @Override
    public UUID registerEdir(EdirDto edirDto) {
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
