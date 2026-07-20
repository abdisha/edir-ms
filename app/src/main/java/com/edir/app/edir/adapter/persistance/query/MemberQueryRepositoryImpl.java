package com.edir.app.edir.adapter.persistance.query;

import com.edir.app.edir.adapter.persistance.jpa.EdirJpaRepository;
import com.edir.app.edir.application.api.MemberSummary;
import com.edir.app.edir.application.ports.out.query.MemberDetailView;
import com.edir.app.edir.application.ports.out.query.MemberQueryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Component
public class MemberQueryRepositoryImpl implements MemberQueryRepository {
    private final EdirJpaRepository jpaRepository;

    public MemberQueryRepositoryImpl(EdirJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public Optional<MemberDetailView> findMember(UUID memberId) {
       log.info("Fetching member for member id: {}", memberId);
        return jpaRepository.findMember(memberId);
    }

    @Override
    public Optional<List<MemberSummary>> findActiveMembers() {
        return jpaRepository.findActiveMember();
    }
}
