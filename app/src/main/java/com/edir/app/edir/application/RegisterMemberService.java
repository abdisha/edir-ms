package com.edir.app.edir.application;

import com.edir.app.edir.application.command.RegisterMemberCommand;
import com.edir.app.edir.application.usecase.RegisterMemberUseCase;
import com.edir.app.edir.domain.entity.Edir;
import com.edir.app.edir.domain.entity.EdirMember;
import com.edir.app.edir.domain.port.out.EdirRepository;
import com.edir.app.edir.exception.EdirNotFoundException;
import com.edir.app.shared.domain.valueobjects.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Slf4j
@AllArgsConstructor
@Service
public class RegisterMemberService implements RegisterMemberUseCase {
    private final EdirRepository repository;

    @Override
    public UUID execute(RegisterMemberCommand registerMemberCommand) {
       Optional<Edir> edir = repository.find();
        if (edir.isEmpty()){
            log.info("There is no Edir found to register member");
            throw new EdirNotFoundException("There is no Edir found to register member");
        }
        log.info("Registering new member");

        EdirMember edirMember = EdirMember.register(
                new FullName(registerMemberCommand.firstName(),
                registerMemberCommand.middleName(),
                registerMemberCommand.lastName()),
                new Age(registerMemberCommand.age()),
                Gender.valueOf(registerMemberCommand.gender()),
                new Address(
                        registerMemberCommand.address().city(),
                        registerMemberCommand.address().subcity(),
                        registerMemberCommand.address().worda()
                ),
                new PhoneNumber(registerMemberCommand.phoneNumber())
        );

        edir.get().registerMember(edirMember);
        repository.save(edir.get());
        log.info("Member registered successfully");

        return edirMember.getId().value();
    }
}
