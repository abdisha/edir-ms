package com.edir.app.edir.application.usecase;

import com.edir.app.edir.application.command.RegisterMemberCommand;

import java.util.UUID;

public interface RegisterMemberUseCase {
    UUID execute(RegisterMemberCommand registerMemberCommand);
}
