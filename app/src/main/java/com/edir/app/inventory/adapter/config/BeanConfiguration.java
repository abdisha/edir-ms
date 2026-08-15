package com.edir.app.inventory.adapter.config;

import com.edir.app.inventory.domain.InventoryAllocationDomainService;
import com.edir.app.inventory.domain.InventoryAllocationDomainServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfiguration {
    @Bean
    public InventoryAllocationDomainService getInventoryAllocationDomainService() {
        return new InventoryAllocationDomainServiceImpl();
    }
}
