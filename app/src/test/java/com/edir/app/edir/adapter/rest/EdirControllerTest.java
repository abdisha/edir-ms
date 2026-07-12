package com.edir.app.edir.adapter.rest;

import com.edir.app.edir.application.edir.command.Address;
import com.edir.app.edir.application.edir.command.RegisterEdirCommand;
import com.edir.app.shared.adapter.rest.GlobalExceptionHandler;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import tools.jackson.databind.ObjectMapper;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ActiveProfiles("test")
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

        RegisterEdirCommand request = new RegisterEdirCommand(
                "",
                "100.0",
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

        RegisterEdirCommand request = new RegisterEdirCommand(
                "Edir Name",
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
        RegisterEdirCommand request = new RegisterEdirCommand(
                "Edir Name",
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