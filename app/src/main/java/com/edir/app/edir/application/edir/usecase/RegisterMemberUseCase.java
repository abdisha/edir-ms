package com.edir.app.edir.application.edir.usecase;

import com.edir.app.edir.application.edir.command.RegisterMemberCommand;

import java.util.UUID;

public interface RegisterMemberUseCase {
    UUID execute(RegisterMemberCommand registerMemberCommand);
}
