package com.edir.app.inventory.application.in.usecases;

import com.edir.app.inventory.application.in.commands.ChangeStoreNameCommand;
import com.edir.app.inventory.application.in.commands.ChangeStoreOwnerCommand;
import com.edir.app.inventory.application.in.commands.RegisterStoreCommand;

public interface StoreManagementUseCase {
    void register(RegisterStoreCommand command);
    void changeName(ChangeStoreNameCommand command);
    void changeOwner(ChangeStoreOwnerCommand command);
}
