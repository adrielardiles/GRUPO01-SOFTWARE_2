
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

    @GetMapping
    public ResponseEntity<List<PublicacionTRDTO>> listarPublicaciones() {
        List<PublicacionTRDTO> publicaciones = publicacionService.obtenerTodas();
        return ResponseEntity.ok(publicaciones);
    }

    @PostMapping
    public ResponseEntity<String> crearPublicacion(@RequestBody CrearPublicacionTRDTO dto) {
        publicacionService.crear(dto);
        return ResponseEntity.ok("Publicación registrada con éxito");
    }
}
