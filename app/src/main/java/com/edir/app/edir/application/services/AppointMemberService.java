package com.edir.app.edir.application.services;

import com.edir.app.edir.application.ports.in.usecases.AppointMemberUseCase;
import com.edir.app.edir.domain.entity.Edir;
import com.edir.app.edir.application.ports.out.EdirRepository;
import com.edir.app.edir.domain.valueobjects.MemberRole;
import com.edir.app.edir.application.exceptions.EdirNotFoundException;
import com.edir.app.shared.domain.valueobjects.MemberId;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@AllArgsConstructor
@Service
public class AppointMemberService implements AppointMemberUseCase {
    private final EdirRepository edirRepository;
    @Override
    public void execute(MemberId memberId, MemberRole memberRole) {
        Edir edir = edirRepository
                .find()
                .orElseThrow(() ->
                        new EdirNotFoundException("Edir has not been setup")
                );

        edir.appointMember(memberId, memberRole);
        edirRepository.save(edir);
    }
}
