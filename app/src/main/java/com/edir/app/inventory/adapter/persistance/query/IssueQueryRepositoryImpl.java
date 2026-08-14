package com.edir.app.inventory.adapter.persistance.query;

import com.edir.app.inventory.adapter.persistance.jpa.JpaItemIssuedRepository;
import com.edir.app.inventory.application.ports.out.query.IssueItemView;
import com.edir.app.inventory.application.ports.out.query.IssueQueryRepository;
import com.edir.app.inventory.application.ports.out.query.IssueView;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Slf4j
@Component
class IssueQueryRepositoryImpl implements IssueQueryRepository {

    private final JpaItemIssuedRepository jpaIssueQueryRepository;

    @Override
    public List<IssueView> getIssues() {
        return jpaIssueQueryRepository.getIssues();
    }

    @Override
    public List<IssueItemView> getIssuesItem(UUID issueId) {
        return jpaIssueQueryRepository.getIssuesItem(issueId);
    }
}
