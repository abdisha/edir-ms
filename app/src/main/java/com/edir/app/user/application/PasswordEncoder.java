package com.edir.app.user.application;

public interface PasswordEncoder {
    String encode(String rawPassword);
    boolean matches(String incomingPassword, String userPassword);
}
