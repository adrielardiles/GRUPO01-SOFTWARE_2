package com.edu.roomieyabackend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class PublicacionTRController_negra {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testCrearPublicacionCamposValidos() throws Exception {
        Map<String, Object> dto = new HashMap<>();
        dto.put("arrendatario", "Juan Pérez");
        dto.put("precio", 1200.0);
        dto.put("servicios", Arrays.asList("Agua", "Luz"));
        dto.put("serviciosExtra", "Incluye mantenimiento");
        dto.put("referenciasExtra", "Zona segura");
        dto.put("inmuebleId", 1); // ⚠️ Asegúrate de que este ID exista en tu base de datos

        mockMvc.perform(post("/api/publicaciones-tr")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk());
    }
}
