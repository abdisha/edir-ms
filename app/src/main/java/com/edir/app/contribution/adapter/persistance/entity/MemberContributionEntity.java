package com.edir.app.contribution.adapter.persistance.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "member_contributions")
public class MemberContributionEntity {
    @Id
    private UUID id;
    private UUID memberId;
    private UUID contributionId;
    private Boolean isPaid;
    private Boolean isPenalty;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @Column()
    private List<PaymentEntity> paymentEntitySet = new ArrayList<>();
}
