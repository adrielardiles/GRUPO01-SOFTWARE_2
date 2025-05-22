package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.dto.CrearAnuncioRequestDTO;
import com.edu.roomieyabackend.model.entities.Anuncio;
import com.edu.roomieyabackend.service.AnuncioApplicationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/anuncios")
public class AnuncioController {

    private final AnuncioApplicationService anuncioApplicationService;

    public AnuncioController(AnuncioApplicationService anuncioApplicationService) {
        this.anuncioApplicationService = anuncioApplicationService;
    }

    @PostMapping
    public ResponseEntity<Anuncio> crearAnuncio(@RequestBody CrearAnuncioRequestDTO dto) {
        try {
            Anuncio anuncioCreado = anuncioApplicationService.crearAnuncio(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(anuncioCreado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build(); // ejemplo simple de manejo de errores
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}