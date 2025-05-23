package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.dto.PublicacionDTO;
import com.edu.roomieyabackend.model.PublicacionEntity;
import com.edu.roomieyabackend.repository.PublicacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/publicaciones")
@CrossOrigin(origins = "http://localhost:3000")
public class PublicacionController {

    @Autowired
    private PublicacionRepository publicacionRepository;

    @PostMapping
    public ResponseEntity<PublicacionEntity> crearPublicacion(@ModelAttribute PublicacionDTO dto) {
        try {
            PublicacionEntity p = new PublicacionEntity();
            p.setTitulo(dto.getTitulo());
            p.setDescripcion(dto.getDescripcion());
            p.setPrecio(dto.getPrecio());

            MultipartFile imagen = dto.getImagen();
            if (imagen != null && !imagen.isEmpty()) {
                p.setImagen(imagen.getBytes());
            }

            PublicacionEntity saved = publicacionRepository.save(p);
            return ResponseEntity.ok(saved);
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
