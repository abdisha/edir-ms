package com.edir.app.inventory.domain.entity;


import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class ItemIssue {
    private UUID itemIssueId;
    private UUID funeralId;
    private ZonedDateTime zonedDateTime;
    private final List<ItemIssueLine> itemIssueLines = new ArrayList<>();

    public ItemIssue(UUID itemIssueId, UUID funeralId,
                     ZonedDateTime zonedDateTime,
                     List<ItemIssueLine> itemIssueLines
                     ) {
        this.itemIssueId = itemIssueId;
        this.funeralId = funeralId;
        this.zonedDateTime = zonedDateTime;
        this.itemIssueLines.addAll(itemIssueLines);
    }

    public void addLine(ItemIssueLine line){
        itemIssueLines.add(line);
    }

    public UUID getItemIssueId() {
        return itemIssueId;
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
