package com.edir.app.inventory.adapter.rest;

import com.edir.app.inventory.adapter.rest.response.ItemResponse;
import com.edir.app.inventory.application.ports.in.commands.RegisterItemCommand;
import com.edir.app.inventory.application.ports.in.commands.UpdateItemCommand;
import com.edir.app.inventory.application.ports.in.usecases.ItemManagementUseCase;
import com.edir.app.inventory.application.ports.out.query.ItemQueryService;
import com.edir.app.inventory.application.ports.out.query.ItemView;
import com.edir.app.inventory.domain.valueobjects.ItemId;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static com.edir.app.shared.EdirConstant.REST_VERSION;

@AllArgsConstructor
@RestController
@RequestMapping(REST_VERSION+"inventory")
public class InventoryController {

    private final ItemManagementUseCase itemManagementUseCase;
    private final ItemQueryService queryService;

    @PostMapping
    public ResponseEntity<ItemResponse> createItem(@Valid @RequestBody RegisterItemCommand command) {
      var result =  itemManagementUseCase.register(command);
       return ResponseEntity.ok(ItemResponse.toResponse(result));
    }

    @PutMapping()
    public ResponseEntity<Void> updateItem( @RequestBody UpdateItemCommand value) {
        itemManagementUseCase.updateItem(value);
        return ResponseEntity.ok().build();
    }

    @GetMapping()
    public ResponseEntity<List<ItemView>> getItem() {
        var result =  queryService.findAll();
        return ResponseEntity.ok(result);
    }
    @GetMapping("/{itemId}")
    public ResponseEntity<ItemView> getItemById(@PathVariable UUID itemId){
        var result = queryService.findById(itemId);
        if(result.isEmpty()){
            ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(result.get());
    }
    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> deleteItem(@PathVariable UUID itemId){
        itemManagementUseCase.markAsInActive(new ItemId(itemId));
        return ResponseEntity.ok().build();
    }
}
