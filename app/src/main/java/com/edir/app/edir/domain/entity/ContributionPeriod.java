package com.edir.app.edir.domain.entity;

import com.edir.app.edir.domain.valueobjects.ContributionPeriodId;
import com.edir.app.edir.domain.valueobjects.DateRange;
import com.edir.app.edir.domain.valueobjects.EdirId;
import com.edir.app.shared.domain.entity.AggregateRoot;
import com.edir.app.shared.domain.valueobjects.Money;

import java.util.HashSet;
import java.util.Set;

class ContributionPeriod extends AggregateRoot<ContributionPeriodId> {
    private ContributionPeriodId contributionPeriodId;
    private EdirId edirId;
    private Money standardAmount;
    private DateRange dateRange;
    private Boolean isClosed;
    private Money penaltyFee;
    private Set<Fulfillment> fullFilaments =  new HashSet<>();


    public ContributionPeriod(EdirId edirId, Money standardAmount, DateRange dateRange, Money penaltyFee) {
       setId(ContributionPeriodId.generateId());
        this.edirId = edirId;
        this.standardAmount = standardAmount;
        this.dateRange = dateRange;
        this.penaltyFee = penaltyFee;
        this.isClosed = false;
    }


}
