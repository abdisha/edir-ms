package com.edir.app.edir.domain.entity;


import com.edir.app.edir.domain.valueobjects.PenaltyPolicyId;
import com.edir.app.edir.domain.valueobjects.PenaltyType;

public class ContributionPenalty {
    private PenaltyPolicyId penaltyPolicyId;
    private String policyName;
    private String description;
    private PenaltyType penaltyType;
    private Boolean isRetired;

}
