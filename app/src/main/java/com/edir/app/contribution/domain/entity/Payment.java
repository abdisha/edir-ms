package com.edir.app.contribution.domain.entity;

import com.edir.app.contribution.domain.valueobjects.PaymentId;
import com.edir.app.contribution.domain.valueobjects.PaymentMethod;
import com.edir.app.shared.domain.entity.BaseEntity;
import com.edir.app.shared.domain.valueobjects.Money;

import java.time.ZonedDateTime;
import java.util.Objects;

public class Payment extends BaseEntity<PaymentId> {

    private final Money amount;

    private final ZonedDateTime paidAt;

    private final PaymentMethod method;

    private final String receiptNumber;

    private final String note;

    private Payment(
            PaymentId id,
            Money amount,
            ZonedDateTime paidAt,
            PaymentMethod method,
            String receiptNumber,
            String note) {

        super(id);

        this.amount = Objects.requireNonNull(amount);
        this.paidAt = Objects.requireNonNull(paidAt);
        this.method = Objects.requireNonNull(method);
        this.receiptNumber = receiptNumber;
        this.note = note;
    }

    public static Payment create(
            Money amount,
            ZonedDateTime paidAt,
            PaymentMethod method,
            String receiptNumber,
            String note) {

        return new Payment(
                PaymentId.generateId(),
                amount,
                paidAt,
                method,
                receiptNumber,
                note
        );
    }

}