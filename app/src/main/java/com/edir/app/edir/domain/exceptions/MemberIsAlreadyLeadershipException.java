package com.edir.app.edir.domain.exceptions;

import com.edir.app.edir.domain.valueobjects.MemberId;
import com.edir.app.shared.domain.exceptions.DomainException;

public class MemberIsAlreadyLeadershipException extends DomainException {
    public MemberIsAlreadyLeadershipException(MemberId memberId) {
        super("Member %s already has a leadership position".formatted(memberId));
    }
}
