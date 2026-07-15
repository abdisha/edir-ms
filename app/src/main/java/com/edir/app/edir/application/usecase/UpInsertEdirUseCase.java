package com.edir.app.edir.application.usecase;

import com.edir.app.edir.application.command.UpInsertEdirCommand;

import java.util.UUID;

public interface UpInsertEdirUseCase {
    UUID execute(UpInsertEdirCommand upInsertEdirCommand);
}
