
package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.dto.CrearPublicacionTRDTO;
import com.edu.roomieyabackend.dto.PublicacionTRDTO;
import com.edu.roomieyabackend.service.PublicacionTRService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/publicaciones-tr")
@CrossOrigin(origins = "http://localhost:3000")

public class PublicacionTRController {

    private final PublicacionTRService publicacionService;

    public PublicacionTRController(PublicacionTRService publicacionService) {
        this.publicacionService = publicacionService;
    }

    // GET: obtener todas las publicaciones (búsqueda normal)
    @GetMapping
    public ResponseEntity<List<PublicacionTRDTO>> obtenerTodas() {
        List<PublicacionTRDTO> publicaciones = publicacionService.obtenerTodas();
        return ResponseEntity.ok(publicaciones);
    }

    // GET: obtener publicaciones filtradas
    @GetMapping("/filtrar")
    public ResponseEntity<List<PublicacionTRDTO>> filtrarPublicaciones(
            @RequestParam(required = false) String provincia,
            @RequestParam(required = false) List<String> distrito,
            @RequestParam(required = false) List<String> tipo,
            @RequestParam(required = false) Double precioMin,
            @RequestParam(required = false) Double precioMax,
            @RequestParam(required = false) List<String> caracteristicas
    ) {
        List<PublicacionTRDTO> resultado = publicacionService.filtrarPublicaciones(
                provincia, distrito, tipo, precioMin, precioMax, caracteristicas);
        return ResponseEntity.ok(resultado);
    }

    @PostMapping
    public ResponseEntity<String> crearPublicacion(@RequestBody CrearPublicacionTRDTO dto) {
        publicacionService.crear(dto);
        return ResponseEntity.ok("Publicación registrada con éxito");
    }
}
