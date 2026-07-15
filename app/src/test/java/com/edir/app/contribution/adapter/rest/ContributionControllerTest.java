package com.edir.app.contribution.adapter.rest;

import com.edir.app.config.IntegrationTest;
import com.edir.app.contribution.application.commands.CreateContributionCommand;
import com.edir.app.contribution.domain.valueobjects.PenaltyType;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

import static com.edir.app.shared.EdirConstant.REST_VERSION;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


class ContributionControllerTest extends IntegrationTest {

    @Test
    public void ShouldReturn201CreatedOnContributionCreated() throws Exception {
        CreateContributionCommand command = new CreateContributionCommand(
            "test",
            "test",
            ZonedDateTime.now(),
            ZonedDateTime.now().plusMonths(1),
            ZonedDateTime.now().plusMonths(1).plusDays(1),
            BigDecimal.valueOf(1000),
            BigDecimal.valueOf(50),
            PenaltyType.FIXED
        );
        MvcResult result = mockMvc.perform(post(REST_VERSION + "contributions")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(command)))
            .andExpect(status().isCreated())
            .andReturn();

        assertNotNull(result.getResponse().getContentAsString());
    }
    @Test
    public void ShouldReturn400BadRequestOnIncorrectPeriod() throws Exception {

        CreateContributionCommand command = new CreateContributionCommand(
            "test",
            "test",
            ZonedDateTime.now().plusMonths(1),
            ZonedDateTime.now(),
            ZonedDateTime.now().plusMonths(1).plusDays(1),
            BigDecimal.valueOf(1000),
            BigDecimal.valueOf(50),
            PenaltyType.FIXED
        );

        mockMvc.perform(post(REST_VERSION + "contributions")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(command)))
            .andExpect(status().isBadRequest());
    }


}
