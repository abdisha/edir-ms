package com.edir.app.contribution.application.services;

import com.edir.app.contribution.application.ports.out.MemberContributionRepository;
import com.edir.app.contribution.domain.MemberContributionService;
import com.edir.app.contribution.domain.entity.MemberContribution;
import com.edir.app.contribution.domain.valueobjects.ContributionId;
import com.edir.app.contribution.domain.valueobjects.MemberContributionId;
import com.edir.app.shared.domain.valueobjects.FullName;
import com.edir.app.shared.domain.valueobjects.MemberId;
import com.edir.app.shared.domain.valueobjects.Money;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@AllArgsConstructor
@Component
public class ContributionHelper {
    private MemberContributionRepository memberContributionRepository;
    private final MemberContributionService initialize;

    public void initializeMemberContribution(MemberId memberId,
                                             FullName fullName,
                                             ContributionId id, Money amount){
        Optional<MemberContribution> previous =
            memberContributionRepository.findLatestByMember(new MemberContributionId(memberId.value()));

        MemberContribution ledger =
            initialize.initialize(
                id,
               amount,
               memberId,
                fullName,
                previous
            );

        memberContributionRepository.save(ledger);
    }

}
