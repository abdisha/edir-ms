package com.edir.app.edir.application.edir.usecase;

import com.edir.app.edir.application.edir.command.UpInsertEdirCommand;

import java.util.UUID;

public interface UpInsertEdirUseCase {
    UUID execute(UpInsertEdirCommand upInsertEdirCommand);
}
