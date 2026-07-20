package com.edir.app.contribution.application.ports.out.query;

import com.edir.app.contribution.domain.valueobjects.MemberContributionStatus;

import java.math.BigDecimal;
import java.util.UUID;

public record MemberContributionView(
UUID id,
UUID memberId,
UUID contributionId,
BigDecimal contributionAmount,
BigDecimal penaltyAmount,
BigDecimal rolledOverContribution,
BigDecimal rolledOverPenalty,
MemberContributionStatus status
) {
}
