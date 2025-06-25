package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.dto.CrearVotacionRequest;
import com.edu.roomieyabackend.dto.ResultadoDTO;
import com.edu.roomieyabackend.dto.VotoRequest;
import com.edu.roomieyabackend.model.VotacionEntity;
import com.edu.roomieyabackend.repository.VotacionRepository;
import com.edu.roomieyabackend.service.VotacionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/votaciones")
public class VotacionController {
    private final VotacionService service;
    private final VotacionRepository repo;

    public VotacionController(VotacionService service, VotacionRepository repo) {
        this.service = service;
        this.repo = repo;
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody CrearVotacionRequest req) {
        service.crearVotacion(req);
        return ResponseEntity.status(201).build();
    }

    @GetMapping("/activas")
    public ResponseEntity<List<VotacionEntity>> activas() {
        List<VotacionEntity> lista = repo.findByEstadoIgnoreCaseAndFechaInicioBeforeAndFechaFinAfter(
            "activa", LocalDateTime.now(), LocalDateTime.now()
        );
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/{id}/votado")
    public ResponseEntity<Map<String, Boolean>> votado(
        @PathVariable Long id,
        @RequestParam Long usuarioId
    ) {
        boolean has = service.hasVoted(usuarioId, id);
        return ResponseEntity.ok(Map.of("votado", has));
    }

    @PostMapping("/{id}/votar")
    public ResponseEntity<?> votar(@PathVariable Long id, @RequestBody VotoRequest req) {
        service.votar(req, id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/resultados")
    public ResponseEntity<List<ResultadoDTO>> resultados(@PathVariable Long id) {
        return ResponseEntity.ok(service.obtenerResultados(id));
    }
}