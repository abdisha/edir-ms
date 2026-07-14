package com.edir.app.contribution.domain.exceptions;

import com.edir.app.shared.domain.exceptions.DomainException;

public class ContributionIsAlreadyClosed extends DomainException {
    public ContributionIsAlreadyClosed(String message) {
        super(message);
    }
}
