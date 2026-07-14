package com.edir.app.contribution.application.exceptions;

import java.util.UUID;

public class MemberContributionNotFoundException extends RuntimeException {
    public MemberContributionNotFoundException(UUID id) {
        super("Member contribution with id " + id + " not found");
    }
}
