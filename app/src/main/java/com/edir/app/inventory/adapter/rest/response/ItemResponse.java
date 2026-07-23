package com.edir.app.inventory.adapter.rest.response;

import com.edir.app.inventory.domain.entity.Item;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@AllArgsConstructor
@Data
public class ItemResponse {
    private UUID itemId;
    private String itemCode;
    private String itemName;

    public static ItemResponse toResponse(Item item){
        return new ItemResponse(
            item.getItemId(),
            item.getItemCode().code(),
            item.getItemName()
        );
    }
}
