package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.model.PublicacionEntity;
import com.edu.roomieyabackend.repository.PublicacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/publicaciones")
@CrossOrigin(origins = "http://localhost:3000")  // Permite llamadas desde React
public class PublicacionController {

    @Autowired
    private PublicacionRepository publicacionRepository;

    @PostMapping
    public ResponseEntity<?> crearPublicacion(
            @RequestParam("titulo") String titulo,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("precio") Double precio,
            @RequestParam("imagen") MultipartFile imagen) throws IOException {

        PublicacionEntity p = new PublicacionEntity();
        p.setTitulo(titulo);
        p.setDescripcion(descripcion);
        p.setPrecio(precio);
        p.setImagen(imagen.getBytes());

        publicacionRepository.save(p);
        return ResponseEntity.ok("Publicación guardada exitosamente");
    }

    @GetMapping
    public List<PublicacionEntity> listar() {
        return publicacionRepository.findAll();
    }
}
