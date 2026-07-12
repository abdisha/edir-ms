package com.edir.app.edir.application.edir.query;

import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
public class GetMemberDetailService implements GetMemberDetailQuery{
    @Override
    public Optional<MemberDetailView> execute(UUID memberId) {
        return Optional.empty();
    }
}
