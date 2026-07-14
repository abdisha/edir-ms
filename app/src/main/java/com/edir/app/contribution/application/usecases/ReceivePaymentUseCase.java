package com.edir.app.contribution.application.usecases;

import com.edir.app.contribution.application.commands.ReceivePaymentCommand;

public interface ReceivePaymentUseCase {
    void execute(ReceivePaymentCommand receivePaymentCommand);
}
