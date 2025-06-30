package com.edu.roomieyabackend.model.entities.AnunciosTipos;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AnuncioIntegrationValidosBBTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper; // para convertir DTO a JSON

    @Test
    void testCrearAnuncio_CasoValido_TituloMinimo() throws Exception {
        String requestBody = """
            {
                "creadorId": 1,
                "inmuebleId": 2,
                "titulo": "A",
                "descripcion": "Desc prueba",
                "tipo": "INFORMATIVO",
                "fechaProgramada": null
            }
        """;

        mockMvc.perform(post("/api/anuncios")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.titulo").value("A"))
                .andExpect(jsonPath("$.descripcion").value("Desc prueba"))
                .andExpect(jsonPath("$.tipo").value("INFORMATIVO"));
    }

    @Test
    void testCrearAnuncio_CasoValido_TituloMaximo_FechaFutura() throws Exception {
        String tituloMaximo = "T".repeat(255);
        String descripcionLarga = "Descripción larga de prueba con muchos caracteres...";

        String requestBody = String.format("""
            {
                "creadorId": 5,
                "inmuebleId": 10,
                "titulo": "%s",
                "descripcion": "%s",
                "tipo": "URGENTE",
                "fechaProgramada": "2025-07-01T10:00:00"
            }
        """, tituloMaximo, descripcionLarga);

        mockMvc.perform(post("/api/anuncios")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.titulo").value(tituloMaximo))
                .andExpect(jsonPath("$.descripcion").value(descripcionLarga))
                .andExpect(jsonPath("$.tipo").value("URGENTE"));
    }

    @Test
    void testCrearAnuncio_CasoValido_Recordatorio() throws Exception {
        String requestBody = """
            {
                "creadorId": 3,
                "inmuebleId": 8,
                "titulo": "Recordatorio examen",
                "descripcion": "Estudiar para parcial de SOFT2",
                "tipo": "RECORDATORIO",
                "fechaProgramada": null
            }
        """;

        mockMvc.perform(post("/api/anuncios")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.titulo").value("Recordatorio examen"))
                .andExpect(jsonPath("$.descripcion").value("Estudiar para parcial de SOFT2"))
                .andExpect(jsonPath("$.tipo").value("RECORDATORIO"));
    }

    @Test
    void testCrearAnuncio_CasoValido_EventoIntegrador_FechaFutura() throws Exception {
        String requestBody = """
            {
                "creadorId": 7,
                "inmuebleId": 4,
                "titulo": "Evento integrador",
                "descripcion": "Hackathon RoomieYA 2025-2",
                "tipo": "EVENTO",
                "fechaProgramada": "2025-12-31T23:59:00"
            }
        """;

        mockMvc.perform(post("/api/anuncios")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.titulo").value("Evento integrador"))
                .andExpect(jsonPath("$.descripcion").value("Hackathon RoomieYA 2025-2"))
                .andExpect(jsonPath("$.tipo").value("EVENTO"));
    }
}
