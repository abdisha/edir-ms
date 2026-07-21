package com.edir.app.edir.application.ports.out.query;

import com.edir.app.shared.domain.entity.PageQuery;
import com.edir.app.shared.domain.entity.PageResult;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class MemberQueryService {
    private final MemberQueryRepository memberQueryRepository;
    public Optional<MemberDetailView> getMember(UUID memberId) {
        return memberQueryRepository.findMember(memberId);
    }

    public PageResult<MemberDetailView> getMembers(PageQuery pageQuery){
        return memberQueryRepository.findMembers(pageQuery);
    }
}
