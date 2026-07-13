package com.edir.app.edir.domain.exceptions;

import com.edir.app.shared.domain.exceptions.DomainException;
import com.edir.app.shared.domain.valueobjects.MemberId;

public class MemberNotFoundException extends DomainException {
    public MemberNotFoundException(MemberId memberId) {
        super("Member with id: " + memberId + " not found");
    }
}
