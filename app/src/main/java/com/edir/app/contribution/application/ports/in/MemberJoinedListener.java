package com.edir.app.contribution.application.ports.in;

import com.edir.app.contribution.application.ports.out.query.ContributionQueryService;
import com.edir.app.contribution.application.services.ContributionHelper;
import com.edir.app.contribution.domain.valueobjects.ContributionId;
import com.edir.app.edir.domain.api.events.MemberJoinedEvent;
import com.edir.app.shared.domain.valueobjects.Money;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.modulith.events.ApplicationModuleListener;
import org.springframework.stereotype.Component;

@Slf4j
@AllArgsConstructor
@Component
public class MemberJoinedListener {
    private final ContributionHelper helper;
    private final ContributionQueryService queryService;

    @ApplicationModuleListener
    public void on(MemberJoinedEvent event) {
        queryService.findOpenContribution().ifPresentOrElse(
            contributionView -> {
                helper.initializeMemberContribution(
                    event.id(),
                    event.fullName(),
                    new ContributionId(contributionView.id()),
                    Money.of(contributionView.contributionAmount())
                );
            },

            () -> {
                log.warn("There is no open contribution to create contribution for this member id: {}",
                    event.id().value());
            }

        );

    }
}
