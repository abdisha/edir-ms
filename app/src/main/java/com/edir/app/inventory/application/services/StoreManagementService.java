package com.edir.app.inventory.application.services;

import com.edir.app.inventory.application.exceptions.StoreAlreadyExistsException;
import com.edir.app.inventory.application.exceptions.StoreNotFoundException;
import com.edir.app.inventory.application.ports.in.commands.ChangeStoreNameCommand;
import com.edir.app.inventory.application.ports.in.commands.ChangeStoreOwnerCommand;
import com.edir.app.inventory.application.ports.in.commands.RegisterStoreCommand;
import com.edir.app.inventory.application.ports.in.usecases.StoreManagementUseCase;
import com.edir.app.inventory.application.ports.out.StoreRepository;
import com.edir.app.inventory.domain.entity.Store;
import com.edir.app.inventory.domain.valueobjects.StoreId;
import com.edir.app.shared.application.usecase.UseCase;
import com.edir.app.shared.domain.valueobjects.MemberId;
import lombok.AllArgsConstructor;
import org.jspecify.annotations.NonNull;

import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@UseCase
class StoreManagementService implements StoreManagementUseCase {
    private final StoreRepository storeRepository;

    @Override
    public void register(RegisterStoreCommand command) {
        Optional<Store> store = storeRepository.findByName(command.name());
        if(store.isPresent()){
            throw  new StoreAlreadyExistsException(command.name());
        }
        Store newStore = Store.register(
            command.name(),
            command.location(),
            new MemberId(command.ownerId())
        );
        storeRepository.save(newStore);
    }

    @Override
    public void changeName(ChangeStoreNameCommand command) {
        Store store = getStore(command.storeId());
        store.changeName(command.name());
        storeRepository.save(store);
    }

    @Override
    public void changeOwner(ChangeStoreOwnerCommand command) {
        Store store = getStore(command.storeId());
        store.changeOwner(new MemberId(UUID.fromString(command.memberId())));
        storeRepository.save(store);
    }

    private @NonNull Store getStore(String command) {
        Store store = storeRepository.findById(new StoreId(UUID.fromString(command)))
            .orElseThrow(
                () -> new StoreNotFoundException(new StoreId(UUID.fromString(command)))
            );
        return store;
    }
}
