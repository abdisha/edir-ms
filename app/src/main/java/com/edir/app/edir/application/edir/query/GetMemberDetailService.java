package com.edir.app.edir.application.edir.query;

import java.util.Optional;
import java.util.UUID;

public class GetMemberDetailService implements GetMemberDetailQuery{


    @Override
    public Optional<MemberDetailView> execute(UUID memberId) {
        return Optional.empty();
    }
}
