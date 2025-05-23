package com.edu.roomieyabackend.service;

import com.edu.roomieyabackend.model.entities.CitaVisita;
import com.edu.roomieyabackend.repository.CitaVisitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CitaVisitaService {

    @Autowired
    private CitaVisitaRepository citaVisitaRepository;

    // Obtener todas las citas
    public List<CitaVisita> getAllCitas() {
        return citaVisitaRepository.findAll();
    }

    // Crear una cita
    public CitaVisita createCita(CitaVisita cita) {
        return citaVisitaRepository.save(cita);
    }

    // Buscar cita por ID
    public Optional<CitaVisita> getCitaById(Long id) {
        return citaVisitaRepository.findById(id);
    }

    // Cancelar una cita (actualiza estado a CANCELADO)
    public CitaVisita cancelarCita(Long id) {
        Optional<CitaVisita> optionalCita = citaVisitaRepository.findById(id);
        if (optionalCita.isPresent()) {
            CitaVisita cita = optionalCita.get();
            cita.setEstado("CANCELADO");
            return citaVisitaRepository.save(cita);
        }
        return null;
    }

    // Eliminar una cita
    public void deleteCita(Long id) {
        citaVisitaRepository.deleteById(id);
    }
}
