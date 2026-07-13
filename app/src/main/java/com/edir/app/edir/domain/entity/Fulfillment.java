package com.edir.app.edir.domain.entity;

import com.edir.app.edir.domain.exceptions.AlreadyPaidException;
import com.edir.app.edir.domain.exceptions.InsufficientPaymentException;
import com.edir.app.edir.domain.valueobjects.FulfillmentId;
import com.edir.app.edir.domain.valueobjects.MemberId;
import com.edir.app.shared.domain.entity.BaseEntity;
import com.edir.app.shared.domain.valueobjects.Money;

import java.time.ZonedDateTime;
import java.util.Objects;

public class Fulfillment extends BaseEntity<FulfillmentId> {
    private final MemberId memberId;
    private Money paidAmount;
    private final Money expectedAmount;
    private final Money carriedOverDebt;
    private Money penaltyAmount;
    private ZonedDateTime paidDate;

    protected Fulfillment(FulfillmentId fulfillmentId,
                       MemberId memberId,
                       Money expectedAmount,
                       Money carriedOverDebt) {
        super(fulfillmentId);
        this.memberId = memberId;
        this.expectedAmount = expectedAmount;
        this.carriedOverDebt = carriedOverDebt;
    }

    public static Fulfillment addFulfillment(MemberId memberId,
                                             Money expectedAmount,
                                             Money carriedOverDebt){

        return new Fulfillment(
                FulfillmentId.generateId(),
                memberId,
                expectedAmount,
                carriedOverDebt
        );
    }

    public void recordPayment(Money paidAmount, ZonedDateTime paidDate){
        if (isFullyPaid()){
            throw new AlreadyPaidException("Payment has already been made.");
        }

        if(expectedAmount.isGreaterThan(paidAmount)){
            throw new InsufficientPaymentException("Insufficient payment amount.");
        }

        this.paidAmount = paidAmount;
        this.paidDate = paidDate;
    }

    public Boolean isFullyPaid(){
        return Objects.equals(expectedAmount, paidAmount.subtract(carriedOverDebt.add(penaltyAmount)));
    }

    public Money calculateOutstandingDebtAtEnd(){
        return paidAmount.subtract(expectedAmount.add(carriedOverDebt.add(penaltyAmount)));
    }

    public Boolean isOverDue(ZonedDateTime deadLine,ZonedDateTime now){
        return !isFullyPaid() && now.isAfter(deadLine);
    }

    public Money getTotalPayment(){
        return paidAmount.add(carriedOverDebt.add(penaltyAmount));
    }

    public MemberId getMemberId() {
        return memberId;
    }

    public Money getPaidAmount() {
        return paidAmount;
    }

    public Money getCarriedOverDebt() {
        return carriedOverDebt;
    }

    public Money getPenaltyAmount() {
        return penaltyAmount;
    }
    public ZonedDateTime getPaidDate() {
        return paidDate;
    }
}
