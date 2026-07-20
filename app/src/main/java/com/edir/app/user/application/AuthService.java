package com.edir.app.user.application;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class AuthService implements AuthenticateUseCase{


    @Override
    public String login(String email, String password) {
        return "";
    }
}
