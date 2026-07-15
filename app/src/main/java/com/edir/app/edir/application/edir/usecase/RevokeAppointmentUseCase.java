package com.edir.app.edir.application.edir.usecase;

import com.edir.app.shared.domain.valueobjects.MemberId;

public interface RevokeAppointmentUseCase {
    void execute(MemberId memberId);
}
