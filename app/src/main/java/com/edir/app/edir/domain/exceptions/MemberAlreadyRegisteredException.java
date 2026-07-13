package com.edir.app.edir.domain.exceptions;

import com.edir.app.edir.domain.valueobjects.MemberId;
import com.edir.app.shared.domain.exceptions.DomainException;

public class MemberAlreadyRegisteredException extends DomainException {
    public MemberAlreadyRegisteredException(MemberId memberId) {
        super("Member with id: " + memberId + " is already registered");
    }
}
