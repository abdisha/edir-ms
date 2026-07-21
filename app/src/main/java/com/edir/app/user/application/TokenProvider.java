package com.edir.app.user.application;

import com.edir.app.user.domain.User;

import java.util.Optional;

public interface TokenProvider {
    String generateToken(User user);
    Optional<String> extractEmail(String token);
    boolean validateToken(String token, String expectedEmail);
}
