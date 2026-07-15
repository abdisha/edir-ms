package com.edir.app.contribution.adapter.persistance.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name = "payment",schema = "contributions")
public class PaymentEntity {
    @Id
    private UUID id;
    @NotNull
    @Column(precision = 19, scale = 4)
    private BigDecimal amount;
    private UUID receipterId;
    private String receiptNumber;
    @Column(length =200 )
    private String note;
    private ZonedDateTime paidAt;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    @JoinColumn(name = "member_contribution_id")
    private MemberContributionEntity memberContribution;

}
