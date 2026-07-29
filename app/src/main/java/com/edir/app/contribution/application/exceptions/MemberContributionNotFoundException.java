package com.edir.app.contribution.application.exceptions;

import com.edir.app.shared.domain.exceptions.DomainException;

import java.util.UUID;

public class MemberContributionNotFoundException extends DomainException {
    public MemberContributionNotFoundException(UUID id) {
        super("Member contribution with id " + id + " not found");
    }
}
