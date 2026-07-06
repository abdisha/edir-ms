package com.edir.app;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.modulith.core.ApplicationModules;

@SpringBootTest
class AppApplicationTests {

    @Test
    void contextLoads() {
       var modules =  ApplicationModules.of(AppApplication.class);
       modules.verify();
    }

}
