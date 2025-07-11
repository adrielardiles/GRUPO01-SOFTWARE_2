package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.model.entities.CitaVisita;
import com.edu.roomieyabackend.service.CitaVisitaService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;


@WebMvcTest(CitaVisitaController.class)
class CitaVisitaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CitaVisitaService citaVisitaService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testCrearCita() throws Exception {
        CitaVisita cita = new CitaVisita();
        cita.setNombre("Pedro");

        when(citaVisitaService.crearCita(any(CitaVisita.class))).thenReturn(cita);

        mockMvc.perform(post("/api/citas")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(cita)))
                .andExpect(status().isOk());
    }

    @Test
    void testGetCitaById() throws Exception {
        CitaVisita cita = new CitaVisita();
        cita.setId(1L);
        cita.setNombre("Luis");

        when(citaVisitaService.getCitaById(1L)).thenReturn(Optional.of(cita));

        mockMvc.perform(get("/api/citas/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.nombre").value("Luis"));
    }
}
