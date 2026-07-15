package com.edir.app.edir.application.api;

import com.edir.app.edir.application.query.MemberQueryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service

public class ActiveMemberQueryService implements ActiveMemberQuery {
    private  final MemberQueryRepository memberQueryRepository;
    @Override
    public Optional<List<MemberSummary>> findActiveMembers() {
        return memberQueryRepository.findActiveMembers();
    }
}
