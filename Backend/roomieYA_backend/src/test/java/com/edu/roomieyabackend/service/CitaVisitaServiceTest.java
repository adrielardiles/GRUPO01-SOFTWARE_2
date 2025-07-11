package com.edu.roomieyabackend.service;

import com.edu.roomieyabackend.model.entities.CitaVisita;
import com.edu.roomieyabackend.repository.CitaVisitaRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class CitaVisitaServiceTest {

    @Mock
    private CitaVisitaRepository citaVisitaRepository;

    @InjectMocks
    private CitaVisitaService citaVisitaService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCrearCita() {
        CitaVisita cita = new CitaVisita();
        cita.setNombre("Juan");

        when(citaVisitaRepository.save(any(CitaVisita.class))).thenReturn(cita);

        CitaVisita result = citaVisitaService.crearCita(cita);

        assertNotNull(result);
        assertEquals("Juan", result.getNombre());
        verify(citaVisitaRepository, times(1)).save(cita);
    }

    @Test
    void testGetCitaById() {
        CitaVisita cita = new CitaVisita();
        cita.setId(1L);

        when(citaVisitaRepository.findById(1L)).thenReturn(Optional.of(cita));

        Optional<CitaVisita> result = citaVisitaService.getCitaById(1L);

        assertTrue(result.isPresent());
        assertEquals(1L, result.get().getId());
        verify(citaVisitaRepository, times(1)).findById(1L);
    }
}
