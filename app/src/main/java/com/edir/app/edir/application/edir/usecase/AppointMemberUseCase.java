package com.edir.app.edir.application.edir.usecase;

import com.edir.app.edir.domain.valueobjects.MemberId;
import com.edir.app.edir.domain.valueobjects.MemberRole;

public interface AppointMemberUseCase {
    void execute(MemberId memberId, MemberRole memberRole);
}
