package com.edir.app.contribution.adapter.config;

import com.edir.app.contribution.domain.ContributionDomainServiceImpl;
import com.edir.app.contribution.domain.MemberContributionService;
import com.edir.app.contribution.domain.MemberContributionServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * This config file creates member contribution
 */
@Configuration
public class BeanConfiguration {

    @Bean
    public ContributionDomainServiceImpl getDomainService(){
        return new ContributionDomainServiceImpl();
    }

    @Bean
    public MemberContributionService getMemberContributionInitialization(){
        return new MemberContributionServiceImpl();
    }

}


