package com.edir.app.user.adapter.utils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseCookie;

import java.util.Optional;

public class CookieUtils {
    private static final String COOKIE_NAME = "AUTH_TOKEN";

    public static ResponseCookie createJwtCookie(String token, long durationSeconds) {
        return ResponseCookie.from(COOKIE_NAME, token)
            .httpOnly(true)                // Mitigates XSS attacks
            .secure(true)                  // Enforces HTTPS only
            .path("/")                     // Accessible across app paths
            .maxAge(durationSeconds)       // Lifespan
            .sameSite("Strict")            // Mitigates CSRF attacks
            .build();
    }

    public static Optional<String> extractJwtFromCookie(HttpServletRequest request) {
        if (request.getCookies() == null) return Optional.empty();

        for (Cookie cookie : request.getCookies()) {
            if (COOKIE_NAME.equals(cookie.getName())) {
                return Optional.ofNullable(cookie.getValue());
            }
        }
        return Optional.empty();
    }

    public static ResponseCookie deleteJwtCookie() {
        return ResponseCookie.from(COOKIE_NAME, "")
            .httpOnly(true)
            .secure(true)
            .path("/")
            .maxAge(0) // Immediately expires the cookie
            .sameSite("Strict")
            .build();
    }
}
