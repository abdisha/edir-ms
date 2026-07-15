package com.edir.app.contribution.adapter.persistance.entity;

import com.edir.app.contribution.domain.valueobjects.MemberContributionStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name = "member_contributions",schema = "contributions")
public class MemberContributionEntity {
    @Id
    private UUID id;
    private UUID memberId;
    private UUID contributionId;
    @Column(precision = 19, scale = 4)
    private BigDecimal contributionAmount;
    @Column(precision = 19, scale = 4)
    private BigDecimal penaltyAmount;
    @Column(precision = 19, scale = 4)
    private BigDecimal rolledOverContribution;
    @Column(precision = 19, scale = 4)
    private BigDecimal rolledOverPenalty;
    @Enumerated(EnumType.STRING)
    private MemberContributionStatus status;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PaymentEntity> paymentEntities = new ArrayList<>();
}
