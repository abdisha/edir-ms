package com.edir.app.contribution.application.exceptions;

public class UnClosedContributionFoundException extends RuntimeException{
    public UnClosedContributionFoundException(String message) {
        super(message);
    }
}
