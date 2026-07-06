package com.edir.app.edir.domain.entity;

import com.edir.app.edir.domain.valueobjects.ContributionPolicyId;
import com.edir.app.edir.domain.valueobjects.EdirId;
import com.edir.app.shared.domain.valueobjects.Money;

import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

class Contribution {
    private ContributionPolicyId contributionPolicyId;
    private EdirId edirId;
    private Money amount;
    private ZonedDateTime statedDate;
    private Boolean isActive;
    private Set<ContributionPenalty> penaltyPolicies = new HashSet<>();
}
