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
class AnuncioIntegrationNoValidosBBTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testCrearAnuncio_CreadorNoExistente() throws Exception {
        String requestBody = """
            {
                "creadorId": 999,
                "inmuebleId": 2,
                "titulo": "Anuncio prueba",
                "descripcion": "Descripción normal",
                "tipo": "INFORMATIVO",
                "fechaProgramada": null
            }
        """;

        mockMvc.perform(post("/api/anuncios")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testCrearAnuncio_InmuebleNoExistente() throws Exception {
        String requestBody = """
            {
                "creadorId": 1,
                "inmuebleId": 999,
                "titulo": "Anuncio prueba",
                "descripcion": "Descripción normal",
                "tipo": "URGENTE",
                "fechaProgramada": null
            }
        """;

        mockMvc.perform(post("/api/anuncios")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testCrearAnuncio_TituloVacio() throws Exception {
        String requestBody = """
            {
                "creadorId": 1,
                "inmuebleId": 2,
                "titulo": "",
                "descripcion": "Descripción normal",
                "tipo": "EVENTO",
                "fechaProgramada": null
            }
        """;

        mockMvc.perform(post("/api/anuncios")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testCrearAnuncio_TituloMayorA255() throws Exception {
        String tituloLargo = "T".repeat(256);

        String requestBody = String.format("""
            {
                "creadorId": 1,
                "inmuebleId": 2,
                "titulo": "%s",
                "descripcion": "Descripción normal",
                "tipo": "RECORDATORIO",
                "fechaProgramada": null
            }
        """, tituloLargo);

        mockMvc.perform(post("/api/anuncios")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testCrearAnuncio_DescripcionNull() throws Exception {
        String requestBody = """
            {
                "creadorId": 1,
                "inmuebleId": 2,
                "titulo": "Título normal",
                "descripcion": null,
                "tipo": "INFORMATIVO",
                "fechaProgramada": null
            }
        """;

        mockMvc.perform(post("/api/anuncios")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testCrearAnuncio_TipoInvalido() throws Exception {
        String requestBody = """
            {
                "creadorId": 1,
                "inmuebleId": 2,
                "titulo": "Título normal",
                "descripcion": "Descripción normal",
                "tipo": "INVALIDO",
                "fechaProgramada": null
            }
        """;

        mockMvc.perform(post("/api/anuncios")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testCrearAnuncio_FechaPasada() throws Exception {
        String requestBody = """
            {
                "creadorId": 1,
                "inmuebleId": 2,
                "titulo": "Título normal",
                "descripcion": "Descripción normal",
                "tipo": "URGENTE",
                "fechaProgramada": "2020-01-01T00:00:00"
            }
        """;

        mockMvc.perform(post("/api/anuncios")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isBadRequest());
    }
}
