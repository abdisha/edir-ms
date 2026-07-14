package com.edir.app.contribution.adapter.persistance.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "payment")
public class PaymentEntity {
    @Id
    private UUID id;
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
