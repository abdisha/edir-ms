package com.edir.app.edir.application.api;

import java.util.UUID;

public record MemberSummary(
    UUID memberId,
    String FullName
) {
}
