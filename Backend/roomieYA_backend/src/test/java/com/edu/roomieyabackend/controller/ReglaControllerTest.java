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

public class ReglaControllerTest {

    @Mock
    private ReglaRepository reglaRepository;

    @InjectMocks
    private ReglaController reglaController;

    @BeforeEach
    void setUp() {
        // Aquí se inyectan los mocks en el controlador
    }

    @Test
    void testCrearRegla() throws Exception {
        Regla regla = new Regla();
        regla.setTexto("Nueva regla de prueba");

        when(reglaRepository.save(any(Regla.class))).thenReturn(regla);

        // Llamamos al método del controlador
        ResponseEntity<Regla> response = reglaController.crearRegla(regla);

        // Verificamos que la respuesta sea 200 OK y que el contenido sea el esperado
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Nueva regla de prueba", response.getBody().getTexto());

        // Verificamos que el repositorio haya sido llamado correctamente
        verify(reglaRepository).save(regla);
    }
}
