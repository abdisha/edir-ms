package com.edir.app.edir.domain.exceptions;

import com.edir.app.edir.domain.valueobjects.MemberId;
import com.edir.app.shared.domain.exceptions.DomainException;

public class MemberNotFoundException extends DomainException {
    public MemberNotFoundException(MemberId memberId) {
        super("Member with id: " + memberId + " not found");
    }
}
