package com.edir.app.contribution.application.exceptions;

import com.edir.app.shared.ApplicationException;

public class UnClosedContributionFoundException extends ApplicationException {
    public UnClosedContributionFoundException(String message) {
        super(message);
    }
}
