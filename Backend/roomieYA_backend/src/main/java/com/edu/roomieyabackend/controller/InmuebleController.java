// InmuebleController.java
package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.dto.Searching.InmuebleSimilitudDTO;
import com.edu.roomieyabackend.model.entities.Inmueble;
import com.edu.roomieyabackend.repository.InmuebleRepository;
import com.edu.roomieyabackend.service.EmbeddingService;
import com.edu.roomieyabackend.service.InmuebleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/inmuebles")
public class InmuebleController {

    @Autowired
    private InmuebleRepository inmuebleRepository;
    private final InmuebleService inmuebleService;
    private final EmbeddingService embeddingService;

    public InmuebleController(InmuebleService inmuebleService, EmbeddingService embeddingService) {
        this.inmuebleService = inmuebleService;
        this.embeddingService = embeddingService;
    }

    // POST: crear nuevo inmueble
    @PostMapping
    public ResponseEntity<Inmueble> crearInmueble(@RequestBody Inmueble inmueble) {
        Inmueble guardado = inmuebleService.guardarInmueble(inmueble);
        return ResponseEntity.ok(guardado);
    }

    // GET: obtener inmueble por ID
    @GetMapping("/{id}")
    public ResponseEntity<Inmueble> obtenerInmueblePorId(@PathVariable Long id) {
        Optional<Inmueble> inmuebleOptional = inmuebleRepository.findById(id);
        return inmuebleOptional.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // PUT: actualizar inmueble por ID
    @PutMapping("/{id}")
    public ResponseEntity<Inmueble> actualizarInmueble(
            @PathVariable Long id,
            @RequestBody Inmueble inmueble) {
        Inmueble actualizado = inmuebleService.actualizarInmueble(id, inmueble);
        return ResponseEntity.ok(actualizado);
    }

    // GET: búsqueda semántica → lista ordenada por similitud con explicación
    @GetMapping("/buscar")
    public ResponseEntity<List<InmuebleSimilitudDTO>> buscarPorDescripcion(
            @RequestParam String texto,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        System.out.println("🧠 Endpoint /buscar → Texto recibido: " + texto);
        List<InmuebleSimilitudDTO> resultados = embeddingService.buscarSimilaresAvanzado(texto, page, size);
        return ResponseEntity.ok(resultados);
    }

    // GET: búsqueda semántica → mejor match
    @GetMapping("/buscar/mejor")
    public ResponseEntity<InmuebleSimilitudDTO> buscarMejorMatch(
            @RequestParam String texto) {

        System.out.println("🔎 Endpoint /buscar/mejor → Texto recibido: " + texto);
        InmuebleSimilitudDTO mejor = embeddingService.buscarMejorMatch(texto);
        if (mejor == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(mejor);
    }

    // GET: listar todos los inmuebles con paginación
    @GetMapping
    public ResponseEntity<List<Inmueble>> obtenerTodosConPaginacion(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("fechaCreacion").descending());
        Page<Inmueble> pageResult = inmuebleRepository.findAll(pageable);
        return ResponseEntity.ok(pageResult.getContent());
    }
}
