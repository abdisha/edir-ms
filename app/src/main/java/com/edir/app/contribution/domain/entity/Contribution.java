package com.edir.app.contribution.domain.entity;

import com.edir.app.contribution.domain.events.ContributionClosedEvent;
import com.edir.app.contribution.domain.events.ContributionCreatedEvent;
import com.edir.app.contribution.domain.exceptions.ContributionIsAlreadyClosed;
import com.edir.app.contribution.domain.valueobjects.ContributionId;
import com.edir.app.contribution.domain.valueobjects.ContributionStatus;
import com.edir.app.contribution.domain.valueobjects.DateRange;
import com.edir.app.contribution.domain.valueobjects.PenaltyPolicy;
import com.edir.app.shared.domain.entity.AggregateRoot;
import com.edir.app.shared.domain.valueobjects.Money;

import java.time.ZonedDateTime;
import java.util.Objects;


public class Contribution extends AggregateRoot<ContributionId> {
    private final String name;
    private final String description;
    private final DateRange period;
    private  ZonedDateTime dueDate;
    private Money contributionAmount;
    private ContributionStatus status;
    private PenaltyPolicy penaltyPolicy;

    private Contribution(ContributionId contributionId,
                         String name,
                         String description,
                         DateRange period,
                         Money amount,
                         ZonedDateTime dueDate,
                         ContributionStatus status,
                         PenaltyPolicy penaltyPolicy) {
        super(Objects.requireNonNull(contributionId, "Id cannot be null"));
        this.name = name;
        this.description = description;
        this.period = Objects.requireNonNull(period, "Date range cannot be null");
        this.contributionAmount = Objects.requireNonNull(amount, "Amount cannot be null");
        this.dueDate = dueDate;
        this.status = status;
        this.penaltyPolicy = Objects.requireNonNull(penaltyPolicy, "Penalty policy cannot be null");
    }

    private Contribution(
                         String name,
                         String description,
                         DateRange period,
                         Money amount,
                         ZonedDateTime dueDate,
                         ContributionStatus status,
                         PenaltyPolicy penaltyPolicy) {
        super(Objects.requireNonNull(ContributionId.generateId(), "Id cannot be null"));
        this.name = name;
        this.description = description;
        this.period = Objects.requireNonNull(period, "Date range cannot be null");
        this.contributionAmount = Objects.requireNonNull(amount, "Amount cannot be null");
        this.dueDate = dueDate;
        this.status = status;
        this.penaltyPolicy = Objects.requireNonNull(penaltyPolicy, "Penalty policy cannot be null");
        registerEvent(new ContributionCreatedEvent(
            getId(),
            getContributionAmount(),
            name
        ));
    }

    public static Contribution createContributionWithPenaltyPolicy(
        String name,
        String description,
        DateRange dateRange,
        Money amount,
        ZonedDateTime dueDate,
        PenaltyPolicy penaltyPolicy) {
       return new Contribution(
            name,
            description,
            dateRange,
            amount,
            dueDate,
            ContributionStatus.OPEN,
            penaltyPolicy);

    }

    public static Contribution rehydrate(ContributionId contributionId,
                                         String name,
                                         String description,
                                         DateRange dateRange,
                                         Money amount,
                                         ZonedDateTime dueDate,
                                         ContributionStatus status,
                                         PenaltyPolicy penaltyPolicy) {
        return new Contribution(
            contributionId,
            name,
            description,
            dateRange,
            amount,
            dueDate,
            status,
            penaltyPolicy);
    }

    public void closePeriod() {
        if (status == ContributionStatus.CLOSED) {
            throw new ContributionIsAlreadyClosed("The contribution is already closed");
        }

        status = ContributionStatus.CLOSED;

        registerEvent(
            new ContributionClosedEvent(getId())
        );
    }

    public ContributionStatus getStatus() {
        return status;
    }

    public ZonedDateTime getPeriodStartDate() {
        return period.startDate();
    }

    public ZonedDateTime getPeriodEndDate() {
        return period.endDate();
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public DateRange getPeriod() {
        return period;
    }

    public ZonedDateTime getDueDate() {
        return dueDate;
    }

    public Money getContributionAmount() {
        return contributionAmount;
    }

    public PenaltyPolicy getPenaltyPolicy() {
        return penaltyPolicy;
    }
}
