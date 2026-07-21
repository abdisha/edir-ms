package com.edir.app.edir.adapter.persistance.query;

import com.edir.app.edir.adapter.persistance.jpa.EdirJpaRepository;
import com.edir.app.edir.application.api.MemberSummary;
import com.edir.app.edir.application.ports.out.query.MemberDetailView;
import com.edir.app.edir.application.ports.out.query.MemberQueryRepository;
import com.edir.app.shared.domain.entity.PageQuery;
import com.edir.app.shared.domain.entity.PageResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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

    @Override
    public PageResult<MemberDetailView> findMembers(PageQuery pageQuery) {
        Page result = jpaRepository.findMember(PageRequest.of(pageQuery.page(), pageQuery.size()));

        return new PageResult<>(
            result.getContent(),
            result.getNumber(),
            result.getSize(),
            result.getTotalElements(),
            result.getTotalPages()
        );
    }
}
