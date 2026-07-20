package com.edir.app.edir.adapter.rest;

import com.edir.app.config.IntegrationTest;
import com.edir.app.edir.adapter.rest.request.AppointmentRequest;
import com.edir.app.edir.application.ports.in.commands.Address;
import com.edir.app.edir.application.ports.in.commands.RegisterMemberCommand;
import com.edir.app.edir.application.ports.in.commands.UpInsertEdirCommand;
import com.edir.app.edir.domain.valueobjects.MemberRole;
import com.edir.app.shared.domain.valueobjects.Gender;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

import java.time.ZonedDateTime;
import java.util.UUID;

import static com.edir.app.shared.EdirConstant.REST_VERSION;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class MemberControllerTest extends IntegrationTest {
    RegisterMemberCommand memberRequest;

    @BeforeEach
    void setup() throws Exception {
        UpInsertEdirCommand request = new UpInsertEdirCommand(
                "Bole Edir Name",
            ZonedDateTime.now().minusYears(20),
                "Some Description of bole edir",
                new Address(
                        "city",
                        "subcity",
                        "worda"

                ),
                "0912345678"
        );

        memberRequest= new RegisterMemberCommand(
                "Abdi",
                "Ahmed",
                "Mohammed",
                90,
                Gender.MALE.name(),
                new Address(
                        "Addis Ababa",
                        "Kolfe",
                        "01"
                ),
                "0912345678"
        );

        mockMvc.perform(post(REST_VERSION+"edir")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isCreated());
    }

    @Test
    void shouldRegisterMember() throws Exception {

        MvcResult result =      mockMvc.perform(post(REST_VERSION+"members")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(memberRequest)))
                .andExpect(status().isCreated())
                .andReturn();

        UUID id = objectMapper.readValue(result.getResponse().getContentAsString(), UUID.class);

        assertNotNull(id);
    }

    @Test
    void shouldGetMember() throws Exception {
        UUID id = registerMember();

        mockMvc.perform(get(REST_VERSION+"members/{memberId}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id.toString()))
                .andExpect(jsonPath("$.firstName").value("Abdi"));
    }

    @Test
    void shouldReturn404WhenMemberDoesNotExist() throws Exception {
        mockMvc.perform(get(REST_VERSION+"members/{id}", UUID.randomUUID()))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldAppointDirector() throws Exception {
        UUID memberId = registerMember();

        AppointmentRequest request =
                new AppointmentRequest(MemberRole.DIRECTOR);

        mockMvc.perform(
                        put(REST_VERSION+"members/{id}/appointment", memberId)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isNoContent());
    }

    private UUID registerMember() throws Exception {

        MvcResult result =      mockMvc.perform(post(REST_VERSION+"members")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(memberRequest)))
                .andExpect(status().isCreated())
                .andReturn();

        return objectMapper.readValue(result.getResponse().getContentAsString(), UUID.class);
    }
}
