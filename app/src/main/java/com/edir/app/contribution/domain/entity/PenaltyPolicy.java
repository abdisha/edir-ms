package com.edir.app.contribution.domain.entity;

import com.edir.app.contribution.domain.valueobjects.PenaltyPolicyId;
import com.edir.app.contribution.domain.valueobjects.PenaltyType;
import com.edir.app.shared.domain.entity.BaseEntity;
import com.edir.app.shared.domain.valueobjects.Money;

public class PenaltyPolicy extends BaseEntity<PenaltyPolicyId> {
    private Money amount;
    private PenaltyType penaltyType;


    protected PenaltyPolicy(PenaltyPolicyId penaltyPolicyId) {
        super(penaltyPolicyId);
    }
}
