package com.edir.app.contribution.domain.entity;

import com.edir.app.contribution.domain.valueobjects.PaymentId;
import com.edir.app.shared.domain.entity.BaseEntity;
import com.edir.app.shared.domain.valueobjects.MemberId;
import com.edir.app.shared.domain.valueobjects.Money;

import java.time.ZonedDateTime;
import java.util.Objects;

public class Payment extends BaseEntity<PaymentId> {

    private final Money amount;

    private final ZonedDateTime paidAt;

    private final MemberId receipterId;
    private final String receiptNumber;

    private final String note;

    private Payment(
            PaymentId id,
            Money amount,
            ZonedDateTime paidAt, MemberId receipterId,
            String receiptNumber,
            String note) {

        super(id);

        this.amount = Objects.requireNonNull(amount);
        this.paidAt = Objects.requireNonNull(paidAt);
        this.receipterId = receipterId;
        this.receiptNumber = receiptNumber;
        this.note = note;
    }

    public static Payment createPayment(
            Money amount,
            ZonedDateTime paidAt,
            MemberId receipterId,
            String receiptNumber,
            String note) {

        return new Payment(
                PaymentId.generateId(),
                amount,
                paidAt,
                receipterId,
                receiptNumber,
                note
        );
    }

}
