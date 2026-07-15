package com.edir.app.edir.application.usecase;

import com.edir.app.shared.domain.valueobjects.MemberId;

public interface MemberDeceasedUseCase {
    void execute(MemberId memberId);
}
