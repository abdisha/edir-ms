package com.edir.app.inventory.application.ports.in.usecases;

import com.edir.app.inventory.application.ports.in.commands.ChangeStoreNameCommand;
import com.edir.app.inventory.application.ports.in.commands.ChangeStoreOwnerCommand;
import com.edir.app.inventory.application.ports.in.commands.RegisterStoreCommand;

public interface StoreManagementUseCase {
    void register(RegisterStoreCommand command);
    void changeName(ChangeStoreNameCommand command);
    void changeOwner(ChangeStoreOwnerCommand command);
}
