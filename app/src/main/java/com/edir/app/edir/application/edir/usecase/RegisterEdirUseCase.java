package com.edir.app.edir.application.edir.usecase;

import com.edir.app.edir.application.edir.command.RegisterEdirCommand;

import java.util.UUID;

public interface RegisterEdirUseCase {
    UUID execute(RegisterEdirCommand registerEdirCommand);
}
