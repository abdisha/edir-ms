package com.edir.app.contribution.domain.entity;

import com.edir.app.contribution.domain.valueobjects.ContributionId;
import com.edir.app.contribution.domain.valueobjects.DateRange;
import com.edir.app.contribution.domain.valueobjects.PenaltyPolicy;
import com.edir.app.shared.domain.entity.AggregateRoot;
import com.edir.app.shared.domain.valueobjects.Money;

import java.time.ZonedDateTime;
import java.util.Objects;

public class Contribution extends AggregateRoot<ContributionId> {
    private String description;
    private DateRange period;
    private ZonedDateTime dueDate;
    private Money contributionAmount;
    private Boolean isClosed;
    private PenaltyPolicy penaltyPolicy;

    private Contribution(ContributionId contributionId,
                         String description,
                         DateRange period,
                         Money amount,
                         ZonedDateTime dueDate,
                         PenaltyPolicy penaltyPolicy) {
        super(Objects.requireNonNull(contributionId,"Id cannot be null"));
        this.description = description;
        this.period = Objects.requireNonNull(period,"Date range cannot be null");
        this.contributionAmount = Objects.requireNonNull(amount,"Amount cannot be null");
        this.dueDate = dueDate;
        this.penaltyPolicy = Objects.requireNonNull(penaltyPolicy,"Penalty policy cannot be null");
    }

    private Contribution(ContributionId contributionId,
                        String description,
                        DateRange period,
                        Money amount) {
        super(Objects.requireNonNull(contributionId,"Id cannot be null"));
        this.description = description;
        this.period = Objects.requireNonNull(period,"Date range cannot be null");
        this.contributionAmount = Objects.requireNonNull(amount,"Amount cannot be null");
    }

    public static Contribution createContribution(String description,
                                                  DateRange dateRange,
                                                  Money amount){
        return new Contribution(
                ContributionId.generateId(),
                description,
                dateRange,
                amount);
    }

    public static Contribution createContributionWithPenaltyPolicy( String description,
                                                                    DateRange dateRange,
                                                                    Money amount,
                                                                    ZonedDateTime dueDate,
                                                                    PenaltyPolicy penaltyPolicy) {
        return  new Contribution(
                ContributionId.generateId(),
                description,
                dateRange,
                amount,
                dueDate,
                penaltyPolicy
        );
    }

    public static Contribution rehydrate(ContributionId contributionId,
                                         String description,
                                         DateRange dateRange,
                                         Money amount,
                                         ZonedDateTime dueDate,
                                         PenaltyPolicy penaltyPolicy){
        return new Contribution(
                contributionId,
                description,
                dateRange,
                amount,
                dueDate,
                penaltyPolicy
        );
    }

    public void closeContribution(){
        this.isClosed = true;
    }


    public String getDescription() {
        return description;
    }

    public DateRange getPeriod() {
        return period;
    }

    public Money getContributionAmount() {
        return contributionAmount;
    }

    public PenaltyPolicy getPenaltyPolicy() {
        return penaltyPolicy;
    }
}
