package com.edir.app.edir.domain.exceptions;

import com.edir.app.shared.domain.exceptions.DomainException;
import com.edir.app.shared.domain.valueobjects.MemberId;

public class MemberInActiveException extends DomainException {
    public MemberInActiveException(MemberId id) {
        super("Member %s is not active".formatted(id));
    }
}
