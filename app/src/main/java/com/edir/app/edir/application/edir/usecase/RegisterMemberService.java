package com.edir.app.edir.application.edir.usecase;

import com.edir.app.edir.application.edir.command.RegisterMemberCommand;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class RegisterMemberService implements RegisterMemberUseCase{
    @Override
    public UUID execute(RegisterMemberCommand registerMemberCommand) {
        return UUID.randomUUID();
    }
}
