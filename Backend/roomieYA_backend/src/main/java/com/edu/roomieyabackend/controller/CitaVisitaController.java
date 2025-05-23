package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.model.entities.CitaVisita;
import com.edu.roomieyabackend.service.CitaVisitaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/citas")
@CrossOrigin(origins = "*")
public class CitaVisitaController {

    private final CitaVisitaService service;

    public CitaVisitaController(CitaVisitaService service) {
        this.service = service;
    }

    // Obtener todas las citas
    @GetMapping
    public List<CitaVisita> getCitas() {
        return service.getAllCitas();
    }

    // Crear una nueva cita
    @PostMapping
    public CitaVisita createCita(@RequestBody CitaVisita cita) {
        return service.createCita(cita);
    }

    // Obtener una cita por id
    @GetMapping("/{id}")
    public CitaVisita getCita(@PathVariable Long id) {
        return service.getCitaById(id).orElse(null);
    }

    // Cancelar una cita
    @PutMapping("/cancelar/{id}")
    public CitaVisita cancelarCita(@PathVariable Long id) {
        return service.cancelarCita(id);
    }

    // Eliminar una cita
    @DeleteMapping("/{id}")
    public void deleteCita(@PathVariable Long id) {
        service.deleteCita(id);
    }
}
