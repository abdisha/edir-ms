package com.edir.app.edir.application.ports.in.usecases;

import com.edir.app.edir.application.ports.in.commands.UpInsertEdirCommand;

import java.util.UUID;

public interface UpInsertEdirUseCase {
    UUID execute(UpInsertEdirCommand upInsertEdirCommand);
}
