package com.edir.app.edir.domain.exceptions;

import com.edir.app.edir.domain.valueobjects.MemberId;
import com.edir.app.shared.domain.exceptions.DomainException;

public class MemberInActiveException extends DomainException {
    public MemberInActiveException(MemberId id) {
        super("Member %s is not active".formatted(id));
    }
}
