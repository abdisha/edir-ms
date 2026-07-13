package com.edir.app.edir.application.edir.usecase;

import com.edir.app.edir.domain.valueobjects.MemberId;

public interface RevokeAppointmentUseCase {
    void execute(MemberId memberId);
}
