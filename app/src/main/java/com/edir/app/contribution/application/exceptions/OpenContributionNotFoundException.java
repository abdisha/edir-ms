package com.edir.app.contribution.application.exceptions;

public class OpenContributionNotFoundException extends RuntimeException{
    public OpenContributionNotFoundException(String message) {
        super(message);
    }

    public OpenContributionNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
