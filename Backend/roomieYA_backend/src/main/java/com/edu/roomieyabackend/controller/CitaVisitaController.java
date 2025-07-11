package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.model.entities.CitaVisita;
import com.edu.roomieyabackend.service.CitaVisitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/citas")
public class CitaVisitaController {

    @Autowired
    private CitaVisitaService citaVisitaService;

    @GetMapping
    public List<CitaVisita> getAllCitas() {
        return citaVisitaService.getAllCitas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CitaVisita> getCitaById(@PathVariable Long id) {
        Optional<CitaVisita> optionalCita = citaVisitaService.getCitaById(id);
        return optionalCita.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public CitaVisita crearCita(@RequestBody CitaVisita citaVisita) {
        return citaVisitaService.crearCita(citaVisita);
    }

    // Este es el endpoint para cancelar la cita (usa SOLO uno)
    @PutMapping("/{id}/cancelar")
    public ResponseEntity<CitaVisita> cancelarCita(@PathVariable Long id) {
        Optional<CitaVisita> citaCancelada = citaVisitaService.cancelarCita(id);
        return citaCancelada.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Endpoints para marcar recordatorio enviado
    @PutMapping("/recordatorio24h/{id}")
    public ResponseEntity<Void> marcarRecordatorio24h(@PathVariable Long id) {
        citaVisitaService.marcarRecordatorio24h(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/recordatorio48h/{id}")
    public ResponseEntity<Void> marcarRecordatorio48h(@PathVariable Long id) {
        citaVisitaService.marcarRecordatorio48h(id);
        return ResponseEntity.ok().build();
    }

    // Endpoints para consultar citas que requieren recordatorio
    @GetMapping("/paraRecordatorio24h/{fecha}")
    public List<CitaVisita> citasParaRecordatorio24h(@PathVariable String fecha) {
        return citaVisitaService.citasParaRecordatorio24h(LocalDate.parse(fecha));
    }
    @GetMapping("/paraRecordatorio48h/{fecha}")
    public List<CitaVisita> citasParaRecordatorio48h(@PathVariable String fecha) {
        return citaVisitaService.citasParaRecordatorio48h(LocalDate.parse(fecha));
    }

    @GetMapping("/publicacion/{publicacionId}")
    public List<CitaVisita> getCitasByPublicacionId(@PathVariable Long publicacionId) {
        return citaVisitaService.getCitasByPublicacionId(publicacionId);
    }
    
}
