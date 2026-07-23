package com.edir.app.inventory.adapter.rest;

import com.edir.app.inventory.adapter.rest.response.AllocationResponse;
import com.edir.app.inventory.application.in.commands.AllocateItemCommand;
import com.edir.app.inventory.application.in.commands.TransferCommand;
import com.edir.app.inventory.application.in.usecases.InventoryAllocationUseCase;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static com.edir.app.shared.EdirConstant.REST_VERSION;

@AllArgsConstructor
@RestController
@RequestMapping(REST_VERSION + "/inventory/allocation")
public class InventoryAllocationController {
    private final InventoryAllocationUseCase inventoryAllocationUseCase;

    @PostMapping("allocate")
    public ResponseEntity<Void> allocate(@RequestBody AllocateItemCommand command) {
        inventoryAllocationUseCase.allocateItemToMember(command);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/increase")
    public ResponseEntity<Void> increase(@RequestBody AllocateItemCommand command) {
        inventoryAllocationUseCase.increaseAllocationQuantity(command);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reduce")
    public ResponseEntity<Void> reduce(@RequestBody AllocateItemCommand command) {
        inventoryAllocationUseCase.reduceAllocationQuantity(command);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/transfer")
    public ResponseEntity<Void> transfer(@RequestBody TransferCommand command) {
        inventoryAllocationUseCase.transferAllocation(command);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/{memberId}/member")
    public ResponseEntity<List<AllocationResponse>> getByMemberId(@PathVariable String memberId) {
        var result = inventoryAllocationUseCase
            .getMemberAllocations(UUID.fromString(memberId))
            .stream().map(r -> new AllocationResponse(
                r.getHolderMemberId(),
                r.getItemId(),
                r.getQuantityOnHand()
            )).toList();

        return ResponseEntity
            .ok()
            .body(result);

    }

    @GetMapping("/{itemId}/item")
    public ResponseEntity<List<AllocationResponse>> getByItemId(@PathVariable String itemId) {
        var result = inventoryAllocationUseCase
            .getItemAllocations(UUID.fromString(itemId))
            .stream().map(r -> new AllocationResponse(
                r.getHolderMemberId(),
                r.getItemId(),
                r.getQuantityOnHand()
            )).toList();

        return ResponseEntity
            .ok()
            .body(result);

    }
}
