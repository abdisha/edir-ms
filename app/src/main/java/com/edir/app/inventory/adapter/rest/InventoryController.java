package com.edir.app.inventory.adapter.rest;

import com.edir.app.inventory.adapter.rest.response.ItemResponse;
import com.edir.app.inventory.application.in.commands.RegisterItemCommand;
import com.edir.app.inventory.application.in.commands.UpdateItemCommand;
import com.edir.app.inventory.application.in.usecases.InventoryManagementUseCase;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.edir.app.shared.EdirConstant.REST_VERSION;

@AllArgsConstructor
@RestController
@RequestMapping(REST_VERSION+"/inventory")
public class InventoryController {

    private final InventoryManagementUseCase inventoryManagementUseCase;

    @PostMapping
    public ResponseEntity<ItemResponse> postString(@RequestBody RegisterItemCommand command) {
      var result =  inventoryManagementUseCase.register(command);
       return ResponseEntity.ok(ItemResponse.toResponse(result));
    }

    @PutMapping()
    public ResponseEntity<Void> updateItem( @RequestBody UpdateItemCommand value) {
        inventoryManagementUseCase.updateItem(value);
        return ResponseEntity.ok().build();
    }
}
