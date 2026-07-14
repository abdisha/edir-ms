package com.edir.app.contribution.adapter.config;

import com.edir.app.contribution.domain.ContributionDomainServiceImpl;
import com.edir.app.contribution.domain.MemberContributionInitialization;
import com.edir.app.contribution.domain.MemberContributionInitializationService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfiguration {
    @Bean
    public ContributionDomainServiceImpl getDomainService(){
        return new ContributionDomainServiceImpl();
    }
    @Bean
    public MemberContributionInitialization getMemberContributionInitialization(){
        return new MemberContributionInitializationService();
    }

}
