package com.edir.app.contribution.application.ports.in.usecases;

import com.edir.app.contribution.application.ports.in.commands.ReceivePaymentCommand;

public interface ReceivePaymentUseCase {
    void execute(ReceivePaymentCommand receivePaymentCommand);
}
