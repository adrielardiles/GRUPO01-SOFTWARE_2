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

public class ReglaControllerCajaBlancaTest {

    @Mock
    private ReglaRepository reglaRepository;

    @InjectMocks
    private ReglaController reglaController;

    @BeforeEach
    void setUp() {
        // Aquí se inyectan los mocks en el controlador
    }

    @Test
    void testCrearReglaCajaBlanca() throws Exception {
        Regla regla = new Regla();
        regla.setTexto("Regla de prueba para Caja Blanca");

        when(reglaRepository.save(any(Regla.class))).thenReturn(regla);

        // Verificamos que 'aceptada' esté en 'false' por defecto
        ResponseEntity<Regla> response = reglaController.crearRegla(regla);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertFalse(response.getBody().isAceptada());  // Verifica que 'aceptada' esté en 'false'
    }
}
