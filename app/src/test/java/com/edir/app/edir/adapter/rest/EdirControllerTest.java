package com.edir.app.edir.adapter.rest;

import com.edir.app.edir.application.dto.Address;
import com.edir.app.edir.application.dto.EdirDto;
import com.edir.app.shared.adapter.rest.GlobalExceptionHandler;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import tools.jackson.databind.ObjectMapper;

import java.util.UUID;

import static org.hamcrest.text.MatchesPattern.matchesPattern;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
class EdirControllerTest {

    private MockMvc mockMvc;
    @Autowired
    private EdirController edirController;
    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setup() {
        this.mockMvc = MockMvcBuilders
                .standaloneSetup(edirController)
                .setControllerAdvice(
                        new GlobalExceptionHandler()
                ). build();
    }
    @Test
    void shouldReturn400WhenNameIsBlank() throws Exception {

        EdirDto request = new EdirDto(
                "",
                "100.0",
                new Address(
                        "city",
                        "subcity",
                        "worda"

                ),
                "0912345678"
        );

        mockMvc.perform(post("/api/v0/edirs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Bad Request"))
                .andExpect(jsonPath("$.errors").exists());
    }

    @Test
    void shouldRegisterEdir() throws Exception {

        EdirDto request = new EdirDto(
                "Edir Name",
                "Edir is community support system",
                new Address(
                        "city",
                        "subcity",
                        "worda"

                ),
                "0912345678"
        );

        MvcResult result = mockMvc.perform(post("/api/v0/edirs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andReturn();

        UUID id = objectMapper.readValue(result.getResponse().getContentAsString(), UUID.class);

        assertNotNull(id);
    }
}