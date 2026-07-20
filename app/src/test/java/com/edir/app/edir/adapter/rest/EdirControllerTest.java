package com.edir.app.edir.adapter.rest;

import com.edir.app.config.IntegrationTest;
import com.edir.app.edir.application.ports.in.commands.Address;
import com.edir.app.edir.application.ports.in.commands.UpInsertEdirCommand;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

import java.time.ZonedDateTime;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class EdirControllerTest extends IntegrationTest {

    @Test
    void shouldReturn400WhenNameIsBlank() throws Exception {

        UpInsertEdirCommand request = new UpInsertEdirCommand(
            "",
            ZonedDateTime.now().minusYears(10),
            "Edir is community support system",
            new Address(
                "city",
                "subcity",
                "worda"

            ),

            "0912345678"
        );

        mockMvc.perform(post("/api/v0/edir")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Bad Request"))
                .andExpect(jsonPath("$.errors").exists());
    }

    @Test
    void shouldRegisterEdir() throws Exception {

        UpInsertEdirCommand request = new UpInsertEdirCommand(
                "Edir Name",
               ZonedDateTime.now().minusYears(10),
                "Edir is community support system",
                new Address(
                        "city",
                        "subcity",
                        "worda"

                ),

                "0912345678"
        );

        MvcResult result = mockMvc.perform(post("/api/v0/edir")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andReturn();

        UUID id = objectMapper.readValue(result.getResponse().getContentAsString(), UUID.class);

        assertNotNull(id);
    }

    @Test
    void shouldReturnFullEdir() throws Exception {
        UpInsertEdirCommand request = new UpInsertEdirCommand(
            "Edir Name",
            ZonedDateTime.now().minusYears(10),
            "Edir is community support system",
            new Address(
                "city",
                "subcity",
                "worda"

            ),

            "0912345678"
        );

         mockMvc.perform(post("/api/v0/edir")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());

     mockMvc.perform(get("/api/v0/edir")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect( status().isOk())
                .andExpect(jsonPath("$.edirName").value("Edir Name"))
                .andExpect(jsonPath("$.description").exists());

    }


}
