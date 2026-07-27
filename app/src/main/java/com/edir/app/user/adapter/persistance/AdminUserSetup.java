package com.edir.app.user.adapter.persistance;

import com.edir.app.user.application.AccountRepository;
import com.edir.app.user.application.PasswordEncoder;
import com.edir.app.user.domain.User;
import lombok.AllArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Component
public class AdminUserSetup implements ApplicationRunner {
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;


    private final static String ADMIN_EMAIL ="admin@gmail.com";

    @Override
    public void run(ApplicationArguments args) throws Exception {
       Optional<User> existingUser =  accountRepository.findByEmail(ADMIN_EMAIL);
       if(existingUser.isEmpty()){
           User user = new User(
               UUID.randomUUID(),
               "admin@gmail.com",
               "admin",
               "admin",
               passwordEncoder.encode("Admin123"),
               null
           );

           accountRepository.saveUser(user);
       }

    }
}
