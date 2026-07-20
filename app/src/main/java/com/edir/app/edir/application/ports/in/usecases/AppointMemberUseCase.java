package com.edir.app.edir.application.ports.in.usecases;

import com.edir.app.edir.domain.valueobjects.MemberRole;
import com.edir.app.shared.domain.valueobjects.MemberId;

public interface AppointMemberUseCase {
    void execute(MemberId memberId, MemberRole memberRole);
}
