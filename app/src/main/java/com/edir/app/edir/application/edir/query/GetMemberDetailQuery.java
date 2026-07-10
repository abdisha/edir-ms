package com.edir.app.edir.application.edir.query;

import java.util.Optional;
import java.util.UUID;

public interface GetMemberDetailQuery {
    Optional<MemberDetailView> execute(UUID memberId);
}
