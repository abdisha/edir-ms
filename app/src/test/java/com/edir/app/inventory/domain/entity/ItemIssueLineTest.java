package com.edir.app.inventory.domain.entity;

import com.edir.app.inventory.domain.valueobjects.ItemId;
import com.edir.app.inventory.domain.valueobjects.ItemIssueStatus;
import com.edir.app.inventory.domain.valueobjects.ItemQuantity;
import com.edir.app.shared.domain.exceptions.DomainValidationException;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

class ItemIssueLineTest {

    private final ItemId itemId = new ItemId(UUID.randomUUID());

    private ItemIssueLine line(int issued) {
        return ItemIssueLine.create(
            itemId,
            ItemQuantity.of(issued)
        );
    }

    @Test
    void shouldApproveRequestedQuantity() {

        ItemIssueLine line = line(10);

        line.approve(ItemQuantity.of(4));

        assertThat(line.getApprovedQuantity().quantity())
            .isEqualTo(4);
    }

    @Test
    void shouldFullyApproveWhenEntireQuantityIsApproved() {

        ItemIssueLine line = line(10);

        line.approve(ItemQuantity.of(10));

        assertThat(line.getApprovedQuantity().quantity())
            .isEqualTo(10);

        assertThat(line.getStatus())
            .isEqualTo(ItemIssueStatus.APPROVED);
    }

    @Test
    void shouldAllowMultiplePartialApprovals() {

        ItemIssueLine line = line(10);

        line.approve(ItemQuantity.of(4));

        line.approve(ItemQuantity.of(3));

        assertThat(line.getApprovedQuantity().quantity())
            .isEqualTo(7);
    }

    @Test
    void shouldNotApproveMoreThanRemainingQuantity() {

        ItemIssueLine line = line(10);

        line.approve(ItemQuantity.of(7));

        assertThatThrownBy(() ->
            line.approve(ItemQuantity.of(4))
        )
            .isInstanceOf(DomainValidationException.class);

        assertThat(line.getApprovedQuantity().quantity())
            .isEqualTo(7);
    }

    @Test
    void shouldNotApproveMoreThanIssuedQuantity() {

        ItemIssueLine line = line(10);

        assertThatThrownBy(() ->
            line.approve(ItemQuantity.of(11))
        )
            .isInstanceOf(DomainValidationException.class);

        assertThat(line.getApprovedQuantity().quantity())
            .isZero();
    }

    @Test
    void shouldRejectZeroApproval() {

        ItemIssueLine line = line(10);

        assertThatThrownBy(() ->
            line.approve(ItemQuantity.of(0))
        )
            .isInstanceOf(DomainValidationException.class);
    }
}
