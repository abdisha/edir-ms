package com.edir.app.contribution.application.exceptions;

public class OpenContributionNotFoundException extends RuntimeException{
    public OpenContributionNotFoundException(String message) {
        super(message);
    }
    public OpenContributionNotFoundException() {
        super("Open contribution not found");
    }
}
