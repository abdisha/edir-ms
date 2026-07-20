package com.edir.app.contribution.application.ports.in;

import com.edir.app.contribution.application.services.ContributionHelper;
import com.edir.app.contribution.domain.events.ContributionCreatedEvent;
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
    private final ActiveMemberQuery activeMemberQuery;
    private final ContributionHelper helper;


    @ApplicationModuleListener
    public void on(ContributionCreatedEvent event) {
        Optional<List<MemberSummary>> result = activeMemberQuery.findActiveMembers();
        if (result.isEmpty()) {
            return;
        }

        for (MemberSummary member : result.get()) {
            helper.initializeMemberContribution(new MemberId(member.memberId()),
                event.contributionId(),
                event.amount());
        }
    }

}
