package com.edir.app.edir.adapter.rest.request;

import com.edir.app.edir.domain.valueobjects.MemberRole;
import jakarta.validation.constraints.NotNull;

public record AppointmentRequest(@NotNull(message="Member role cannot be null") MemberRole role) {
}
