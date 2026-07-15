package com.edir.app.contribution.application.port;

import com.edir.app.contribution.domain.MemberContributionService;
import com.edir.app.contribution.domain.entity.MemberContribution;
import com.edir.app.contribution.domain.events.ContributionCreatedEvent;
import com.edir.app.contribution.domain.ports.MemberContributionRepository;
import com.edir.app.contribution.domain.valueobjects.MemberContributionId;
import com.edir.app.edir.application.api.ActiveMemberQuery;
import com.edir.app.edir.application.api.MemberSummary;
import com.edir.app.shared.domain.valueobjects.MemberId;
import lombok.AllArgsConstructor;
import org.springframework.modulith.events.ApplicationModuleListener;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Component
public class ContributionCreatedListener {
    private final MemberContributionRepository memberContributionRepository;
    private final ActiveMemberQuery activeMemberQuery;
    private final MemberContributionService initialize;

    @ApplicationModuleListener
    public void on(ContributionCreatedEvent event) {

        Optional<List<MemberSummary>> result = activeMemberQuery.findActiveMembers();
        if (result.isEmpty()) {
            return;
        }

        for (MemberSummary member : result.get()) {

            Optional<MemberContribution> previous =
                memberContributionRepository.findLatestByMember(new MemberContributionId(member.memberId()));

            MemberContribution ledger =
                initialize.initialize(
                   event.contributionId(),
                   event.amount(),
                    new MemberId(member.memberId()),
                    previous
                );

            memberContributionRepository.save(ledger);
        }
    }

}
