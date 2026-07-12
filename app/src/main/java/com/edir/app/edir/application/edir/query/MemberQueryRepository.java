package com.edir.app.edir.application.edir.query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MemberQueryRepository {
    Optional<MemberDetailView> findMember(UUID memberId);
    Optional<List<MemberDetailView>> findMembers();
}
