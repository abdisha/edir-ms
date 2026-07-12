package com.edir.app.edir.application.edir.query;

import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
public class MemberQueryService {

    public Optional<MemberDetailView> getMember(UUID memberId) {
        return Optional.empty();
    }
}
