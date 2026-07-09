package com.edir.app.edir.domain.entity;

import com.edir.app.edir.domain.valueobjects.ContributionPeriodId;
import com.edir.app.edir.domain.valueobjects.DateRange;
import com.edir.app.edir.domain.valueobjects.EdirId;
import com.edir.app.shared.domain.entity.AggregateRoot;
import com.edir.app.shared.domain.valueobjects.Money;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class ContributionPeriod extends AggregateRoot<ContributionPeriodId> {
    private EdirId edirId;
    private Money standardAmount;
    private DateRange dateRange;
    private Boolean isClosed;
    private Money penaltyFee;
    private Set<Fulfillment> fullFilaments =  new HashSet<>();


    protected ContributionPeriod(ContributionPeriodId contributionPeriodId,
                              EdirId edirId,
                              Money standardAmount,
                              DateRange dateRange,
                              Money penaltyFee,
                              Boolean isClosed) {
        this.setId(contributionPeriodId);
        this.edirId = edirId;
        this.standardAmount=standardAmount;
        this.dateRange = dateRange;
        this.isClosed = isClosed;
        this.penaltyFee = penaltyFee;

    }

    public static ContributionPeriod createContributionPeriod(
            EdirId edirId,
            Money standardAmount,
            DateRange dateRange,
            Money penaltyFee
    ){
        return new ContributionPeriod(
                ContributionPeriodId.generateId(),
                edirId,
                standardAmount,
                dateRange,
                penaltyFee,
                false
        );

    }


    public EdirId getEdirId() {
        return edirId;
    }

    public Money getStandardAmount() {
        return standardAmount;
    }

    public DateRange getDateRange() {
        return dateRange;
    }

    public Boolean getClosed() {
        return isClosed;
    }

    public Money getPenaltyFee() {
        return penaltyFee;
    }

    public Set<Fulfillment> getFullFilaments() {
        return fullFilaments.stream().collect(Collectors.toUnmodifiableSet());
    }
}
