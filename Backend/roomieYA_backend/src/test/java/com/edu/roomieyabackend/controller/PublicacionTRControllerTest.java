package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.model.PublicacionTREntity;
import com.edu.roomieyabackend.service.PublicacionTRService;
import org.junit.Before;
import org.junit.Test;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

public class PublicacionTRControllerTest {

    private PublicacionTRService mockService;
    private PublicacionTRController controller;

    @Before
    public void setUp() {
        mockService = mock(PublicacionTRService.class);
        controller = new PublicacionTRController(mockService);
    }

    @Test
    public void testActualizarEstado_PublicacionNoExiste() {
        Long idInexistente = 999L;

        when(mockService.buscarPorId(idInexistente)).thenReturn(Optional.empty());

        ResponseEntity<String> response = controller.actualizarEstado(idInexistente, "RECHAZADO");

        assertEquals(404, response.getStatusCodeValue());
        verify(mockService, never()).guardar(any());
    }

    @Test
    public void testActualizarEstado_EstadoAprobado() {
        Long id = 1L;
        PublicacionTREntity publicacion = new PublicacionTREntity();

        when(mockService.buscarPorId(id)).thenReturn(Optional.of(publicacion));

        ResponseEntity<String> response = controller.actualizarEstado(id, "APROBADO");

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Estado actualizado a APROBADO", response.getBody());
        assertEquals("APROBADO", publicacion.getEstado());
        verify(mockService).guardar(publicacion);
    }

    @Test
    public void testActualizarEstado_EstadoRechazado() {
        Long id = 2L;
        PublicacionTREntity publicacion = new PublicacionTREntity();

        when(mockService.buscarPorId(id)).thenReturn(Optional.of(publicacion));

        ResponseEntity<String> response = controller.actualizarEstado(id, "RECHAZADO");

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("RECHAZADO", publicacion.getEstado());
        verify(mockService).guardar(publicacion);
    }

    @Test
    public void testActualizarEstado_EstadoEliminado() {
        Long id = 3L;
        PublicacionTREntity publicacion = new PublicacionTREntity();

        when(mockService.buscarPorId(id)).thenReturn(Optional.of(publicacion));

        ResponseEntity<String> response = controller.actualizarEstado(id, "ELIMINADO");

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("ELIMINADO", publicacion.getEstado());
        verify(mockService).guardar(publicacion);
    }
}
