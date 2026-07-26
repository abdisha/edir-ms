package com.edir.app.inventory.domain.entity;


import com.edir.app.inventory.domain.valueobjects.ItemId;
import com.edir.app.inventory.domain.valueobjects.ItemIssueId;
import com.edir.app.inventory.domain.valueobjects.ItemQuantity;
import com.edir.app.shared.domain.entity.AggregateRoot;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class ItemIssue extends AggregateRoot<ItemIssueId> {

    private final UUID funeralId;
    private final ZonedDateTime zonedDateTime;
    private final List<ItemIssueLine> itemIssueLines = new ArrayList<>();

    protected ItemIssue(ItemIssueId itemIssueId,
                        UUID funeralId,
                        ZonedDateTime zonedDateTime,
                        List<ItemIssueLine> itemIssueLines) {
        super(itemIssueId);
        this.funeralId = funeralId;
        this.zonedDateTime = zonedDateTime;
        this.itemIssueLines.addAll(itemIssueLines);
    }

    public ItemIssue(ItemIssueId itemIssueId, UUID funeralId, ZonedDateTime now) {
        super(itemIssueId);
        this.funeralId = funeralId;
        this.zonedDateTime = now;

    }

    public static ItemIssue create(UUID funeralId){
        return new ItemIssue(ItemIssueId.generateId(),
            funeralId,
            ZonedDateTime.now());
    }

    public static ItemIssue rehydrate(ItemIssueId id,UUID funeralId, ZonedDateTime zonedDateTime, List<ItemIssueLine> itemIssueLines){
        return new ItemIssue(id,funeralId,zonedDateTime,itemIssueLines);
    }

    public void addLine(ItemId itemId, ItemQuantity quantity){
        Optional<ItemIssueLine> optionalItemIssue = itemIssueLines
            .stream()
            .filter(i->i.getItemId().equals(itemId))
            .findFirst();

        if(optionalItemIssue.isEmpty()){
            itemIssueLines.add(ItemIssueLine.create(itemId,quantity));
            return;
        }
        optionalItemIssue.get().increaseIssuedQuantity(quantity);
    }

    public UUID getFuneralId() {
        return funeralId;
    }

    public ZonedDateTime getZonedDateTime() {
        return zonedDateTime;
    }

    public List<ItemIssueLine> getItemIssueLines() {
        return List.copyOf(itemIssueLines);
    }
}
