package com.edu.roomieyabackend.controller;

import org.springframework.scheduling.annotation.EnableScheduling;
import com.edu.roomieyabackend.dto.AgendarCitaRequestDTO;
import com.edu.roomieyabackend.model.entities.CitaVisita;
import com.edu.roomieyabackend.service.CitaVisitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/citas")
@CrossOrigin(origins = "*")
public class CitaVisitaController {

    @Autowired
    private CitaVisitaService citaVisitaService;

    @PostMapping
    public CitaVisita agendarCita(@RequestBody AgendarCitaRequestDTO dto) {
        return citaVisitaService.agendarCita(dto);
    }

    @DeleteMapping("/{id}")
    public void cancelarCita(@PathVariable Long id) {
        citaVisitaService.cancelarCita(id);
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<CitaVisita> getCitasPorUsuario(@PathVariable Long usuarioId) {
        return citaVisitaService.listarCitasPorUsuario(usuarioId);
    }

    @PatchMapping("/{id}/cancelar")
    public void cancelarCitaPorPatch(@PathVariable Long id) {
        citaVisitaService.cancelarCita(id);
    }
}
