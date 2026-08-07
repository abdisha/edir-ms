package com.edir.app.inventory.adapter.rest;

import com.edir.app.inventory.application.ports.in.commands.ChangeStoreNameCommand;
import com.edir.app.inventory.application.ports.in.commands.ChangeStoreOwnerCommand;
import com.edir.app.inventory.application.ports.in.commands.RegisterStoreCommand;
import com.edir.app.inventory.application.ports.in.usecases.StoreManagementUseCase;
import com.edir.app.inventory.application.ports.out.query.StoreQueryRepository;
import com.edir.app.inventory.application.ports.out.query.StoreView;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.edir.app.shared.EdirConstant.REST_VERSION;

@AllArgsConstructor
@RestController
@RequestMapping(REST_VERSION+"store")
class StoreController {
    private final StoreManagementUseCase storeManagementUseCase;
    private final StoreQueryRepository storeRepository;


    @PostMapping
    @ResponseStatus(org.springframework.http.HttpStatus.CREATED)
    public void register(@RequestBody RegisterStoreCommand command) {
        storeManagementUseCase.register(command);
    }

    @PutMapping("/{storeId}/name")
    public void changeName(@PathVariable String storeId,
                           @RequestBody String name) {
        storeManagementUseCase.changeName(new ChangeStoreNameCommand(storeId, name));
    }

    @PutMapping("/{storeId}/owner")
    public void changeOwner(@PathVariable String storeId,
                            @RequestBody String memberId) {
        storeManagementUseCase.changeOwner(new ChangeStoreOwnerCommand(storeId, memberId));
    }

    @GetMapping
    public List<StoreView> findAll() {
        return storeRepository.findStore();
    }

}
