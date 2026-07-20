package com.edir.app.user.adapter.security;

import com.edir.app.user.application.PasswordEncoder;

public class SpringSecurityPasswordEncoder  implements PasswordEncoder {
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public String encode(String rawPassword) {
        return encoder.encode(rawPassword);
    }
}
