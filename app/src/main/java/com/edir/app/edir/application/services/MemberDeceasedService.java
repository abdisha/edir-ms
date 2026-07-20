package com.edir.app.edir.application.services;

import com.edir.app.edir.application.ports.in.usecases.MemberDeceasedUseCase;
import com.edir.app.edir.domain.entity.Edir;
import com.edir.app.edir.application.ports.out.EdirRepository;
import com.edir.app.edir.application.exceptions.EdirNotFoundException;
import com.edir.app.shared.domain.valueobjects.MemberId;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@AllArgsConstructor
@Service
@Transactional
public class MemberDeceasedService implements MemberDeceasedUseCase {
    private final EdirRepository edirRepository;

    @Override
    public void execute(MemberId memberId) {

        Edir edir = edirRepository.find()
                .orElseThrow(() ->
                        new EdirNotFoundException("Edir has not been setup"));
        edir.markMemberAsDeceased(memberId);
        edirRepository.save(edir);
    }
}
