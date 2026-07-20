package com.edir.app.edir.application.ports.in.usecases;

import com.edir.app.edir.application.ports.in.commands.RegisterMemberCommand;

import java.util.UUID;

public interface RegisterMemberUseCase {
    UUID execute(RegisterMemberCommand registerMemberCommand);
}
