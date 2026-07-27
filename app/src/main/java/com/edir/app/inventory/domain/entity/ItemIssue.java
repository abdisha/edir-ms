package com.edir.app.inventory.domain.entity;


import com.edir.app.inventory.domain.valueobjects.ItemId;
import com.edir.app.inventory.domain.valueobjects.ItemIssueId;
import com.edir.app.inventory.domain.valueobjects.ItemQuantity;
import com.edir.app.shared.domain.entity.AggregateRoot;
import com.edir.app.shared.domain.valueobjects.MemberId;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class ItemIssue extends AggregateRoot<ItemIssueId> {

    private final UUID funeralId;
    private final MemberId issuerId;
    private final ZonedDateTime zonedDateTime;
    private final List<ItemIssueLine> itemIssueLines = new ArrayList<>();

    protected ItemIssue(ItemIssueId itemIssueId,
                        UUID funeralId,
                        ZonedDateTime zonedDateTime,
                        List<ItemIssueLine> itemIssueLines, MemberId issuerId) {
        super(itemIssueId);
        this.funeralId = funeralId;
        this.zonedDateTime = zonedDateTime;
        this.issuerId = issuerId;
        this.itemIssueLines.addAll(itemIssueLines);
    }

    public ItemIssue(ItemIssueId itemIssueId, UUID funeralId, MemberId issuerId,
                     ZonedDateTime now) {
        super(itemIssueId);
        this.funeralId = funeralId;
        this.issuerId = issuerId;
        this.zonedDateTime = now;

    }

    public static ItemIssue create(UUID funeralId,MemberId issuerId){
        return new ItemIssue(ItemIssueId.generateId(),
            funeralId,
            issuerId,
            ZonedDateTime.now());
    }

    public static ItemIssue rehydrate(ItemIssueId id,
                                      UUID funeralId,
                                      ZonedDateTime zonedDateTime,
                                      MemberId issuerId,
                                      List<ItemIssueLine> itemIssueLines){
        return new ItemIssue(id,
            funeralId,
            zonedDateTime,
            itemIssueLines,issuerId);
    }

    public void addLine(ItemId itemId, MemberId fromId, ItemQuantity quantity){
        Optional<ItemIssueLine> optionalItemIssue = itemIssueLines
            .stream()
            .filter(i->i.getItemId().equals(itemId))
            .findFirst();

        if(optionalItemIssue.isEmpty()){
            itemIssueLines.add(ItemIssueLine.create(itemId,fromId,quantity));
            return;
        }
        optionalItemIssue.get().increaseIssuedQuantity(quantity);
    }

    public MemberId getIssuerId() {
        return issuerId;
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
