package com.edir.app.user.application;

public interface PasswordEncoder {
    String encode(String rawPassword);
}
