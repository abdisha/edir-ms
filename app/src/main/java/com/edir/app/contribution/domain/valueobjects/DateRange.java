package com.edir.app.contribution.domain.valueobjects;

import com.edir.app.contribution.domain.exceptions.InvalidDateRangeException;

import java.time.ZonedDateTime;
import java.util.Objects;

public record DateRange(ZonedDateTime startDate, ZonedDateTime endDate) {

    public DateRange {
        Objects.requireNonNull(startDate, "Start date cannot be null");
        Objects.requireNonNull(endDate, "End date cannot be null");

        if (startDate.isAfter(endDate)) {
            throw new InvalidDateRangeException(
                    "Start date must be before or equal to end date."
            );
        }
    }

    public boolean contains(ZonedDateTime date) {
        Objects.requireNonNull(date);

        return !date.isBefore(startDate)
                && !date.isAfter(endDate);
    }

    public boolean overlaps(DateRange other) {
        Objects.requireNonNull(other);

        return !endDate.isBefore(other.startDate())
                && !startDate.isAfter(other.endDate());
    }

    public boolean startsBefore(DateRange other) {
        return startDate.isBefore(other.startDate());
    }

    public boolean endsAfter(DateRange other) {
        return endDate.isAfter(other.endDate());
    }

    public boolean isActive() {
        ZonedDateTime now = ZonedDateTime.now();
        return contains(now);
    }

    public long durationInDays() {
        return java.time.Duration
                .between(startDate, endDate)
                .toDays();
    }
}

