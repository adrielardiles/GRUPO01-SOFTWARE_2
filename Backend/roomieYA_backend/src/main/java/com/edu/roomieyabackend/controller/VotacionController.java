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

    private final VotacionService votacionService;
    private final VotacionRepository votacionRepository;

    public VotacionController(VotacionService votacionService, VotacionRepository votacionRepository) {
        this.votacionService = votacionService;
        this.votacionRepository = votacionRepository;
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody CrearVotacionRequest req) {
        votacionService.crearVotacion(req);
        return ResponseEntity.status(201).build();
    }

    @GetMapping("/activas")
    public ResponseEntity<List<VotacionEntity>> activas() {
        List<VotacionEntity> lista = votacionRepository.findByEstadoIgnoreCaseAndFechaInicioBeforeAndFechaFinAfter(
            "activa", LocalDateTime.now(), LocalDateTime.now()
        );
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/{votacionId}/votado/{usuarioId}")
    public ResponseEntity<?> yaVotado(@PathVariable Long votacionId, @PathVariable Long usuarioId) {
        boolean votado = votacionService.hasVoted(usuarioId, votacionId);
        return ResponseEntity.ok(Map.of("votado", votado));
    }

    @GetMapping("/{votacionId}")
    public ResponseEntity<VotacionEntity> getVotacionById(@PathVariable Long votacionId) {
        return votacionRepository.findById(votacionId)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/votar")
    public ResponseEntity<?> votar(@PathVariable Long id, @RequestBody VotoRequest req) {
        votacionService.votar(req, id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/resultados")
    public ResponseEntity<List<ResultadoDTO>> resultados(@PathVariable Long id) {
        return ResponseEntity.ok(votacionService.obtenerResultados(id));
    }
}
