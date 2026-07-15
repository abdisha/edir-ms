package com.edir.app.edir.domain.exceptions;

import com.edir.app.shared.domain.exceptions.DomainException;
import com.edir.app.shared.domain.valueobjects.MemberId;

public class MemberAlreadyRegisteredException extends DomainException {
    public MemberAlreadyRegisteredException(MemberId memberId) {
        super("Member with id: " + memberId + " is already registered");
    }
}
