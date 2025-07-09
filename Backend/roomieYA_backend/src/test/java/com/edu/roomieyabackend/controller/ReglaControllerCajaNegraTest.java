package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.model.entities.Regla;
import com.edu.roomieyabackend.repository.ReglaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class ReglaControllerCajaNegraTest {

    @Mock
    private ReglaRepository reglaRepository;

    @InjectMocks
    private ReglaController reglaController;

    @BeforeEach
    void setUp() {
        // Aquí se inyectan los mocks en el controlador
    }

    @Test
    void testCrearReglaCajaNegra() throws Exception {
        String nuevaReglaJson = "{\"texto\":\"Regla creada desde Caja Negra\"}";

        Regla regla = new Regla();
        regla.setTexto("Regla creada desde Caja Negra");

        when(reglaRepository.save(any(Regla.class))).thenReturn(regla);

        // Realiza la solicitud POST
        ResponseEntity<Regla> response = reglaController.crearRegla(regla);

        // Verifica que la respuesta sea correcta
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Regla creada desde Caja Negra", response.getBody().getTexto());
    }
}
