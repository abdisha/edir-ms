package com.edir.app.inventory.application.ports.out.query;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Service
public class IssueQueryService {
    private final IssueQueryRepository queryRepository;

    public List<IssueView> getIssues(){
        return queryRepository.getIssues();
    }

    public List<IssueItemView> getIssuesItem(UUID issueId){
        return queryRepository.getIssuesItem(issueId);
    }
}
