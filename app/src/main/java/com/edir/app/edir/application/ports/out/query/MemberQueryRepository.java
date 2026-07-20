package com.edir.app.edir.application.ports.out.query;

import com.edir.app.edir.application.api.MemberSummary;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MemberQueryRepository {
    Optional<MemberDetailView> findMember(UUID memberId);
    Optional<List<MemberSummary>> findActiveMembers();

}
