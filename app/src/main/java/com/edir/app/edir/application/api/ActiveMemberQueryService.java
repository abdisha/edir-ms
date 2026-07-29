package com.edir.app.edir.application.api;

import com.edir.app.edir.application.ports.out.query.MemberQueryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Service

public class ActiveMemberQueryService implements ActiveMemberQuery {
    private  final MemberQueryRepository memberQueryRepository;
    @Override
    public List<MemberSummary> findActiveMembers() {
        return memberQueryRepository.findActiveMembers();
    }

    @Override
    public Optional<MemberSummary> findMember(UUID memberId) {
        return memberQueryRepository.findByMemberId(memberId);
    }
}
