package com.edir.app.inventory.adapter.rest;

import com.edir.app.inventory.adapter.rest.response.AllocationResponse;
import com.edir.app.inventory.application.in.commands.AllocateItemCommand;
import com.edir.app.inventory.application.in.commands.TransferCommand;
import com.edir.app.inventory.application.in.usecases.InventoryAllocationUseCase;
import com.edir.app.inventory.application.out.query.AllocationQueryService;
import com.edir.app.inventory.application.out.query.ItemQueryService;
import com.edir.app.inventory.application.out.query.ItemView;
import com.edir.app.inventory.application.out.query.StoreAllocationSummaryView;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static com.edir.app.shared.EdirConstant.REST_VERSION;

@AllArgsConstructor
@RestController
@RequestMapping(REST_VERSION + "inventory-allocation")
public class InventoryAllocationController {
    private final InventoryAllocationUseCase inventoryAllocationUseCase;
    private final AllocationQueryService allocationQueryService;
    private final ItemQueryService itemQueryService;

    @PostMapping()
    public ResponseEntity<Void> allocate(@RequestBody AllocateItemCommand command) {
        inventoryAllocationUseCase.assignStore(command);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/increase")
    public ResponseEntity<Void> increase(@RequestBody AllocateItemCommand command) {
        inventoryAllocationUseCase.increaseAllocationQuantity(command);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/transfer")
    public ResponseEntity<Void> transfer(@RequestBody TransferCommand command) {
        inventoryAllocationUseCase.transferAllocation(command);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/unallocated")
    public ResponseEntity<List<ItemView>> getUnAllocatedItems() {
        var result = itemQueryService.findAllUnAllocatedItems();
        return ResponseEntity
            .ok()
            .body(result);
    }

    @GetMapping("/{storeId}/store")
    public ResponseEntity<List<AllocationResponse>> getByStoreId(@PathVariable String storeId) {
        var result = allocationQueryService.findByStoreId(UUID.fromString(storeId));
        return ResponseEntity
            .ok()
            .body(result);

    }

    @GetMapping("/alloction-summary")
    public ResponseEntity<List<StoreAllocationSummaryView>> getAllocationSummary() {
        return ResponseEntity.ok(allocationQueryService.getAllocationSummary());
    }
    @GetMapping("/{storeId}/allocated-item")
    public ResponseEntity<List<AllocationResponse>> getAllocatedItem(@PathVariable UUID storeId) {
        var result = allocationQueryService.findAllocatedItem(storeId);

        return ResponseEntity
            .ok()
            .body(result);

    }
}
