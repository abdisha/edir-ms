package com.edir.app.inventory.application.ports.in;

import lombok.extern.slf4j.Slf4j;
import org.springframework.modulith.events.ApplicationModuleListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional
@Component
public class ItemIssueRequestListener {

    @ApplicationModuleListener
    public void on (){

    }
}
