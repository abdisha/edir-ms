package com.edir.app.inventory.application.ports.out.query;

import java.util.List;
import java.util.UUID;

public interface IssueQueryRepository {

    List<IssueView> getIssues();

    List<IssueItemView> getIssuesItem(UUID issueId);
}
