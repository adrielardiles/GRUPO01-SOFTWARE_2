package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.dto.*;
import com.edu.roomieyabackend.service.AnuncioApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/anuncios")
public class AnuncioController {

    private final AnuncioApplicationService anuncioApplicationService;

    public AnuncioController(AnuncioApplicationService anuncioApplicationService) {
        this.anuncioApplicationService = anuncioApplicationService;
    }

    @PostMapping
    public ResponseEntity<?> crearAnuncio(@Valid @RequestBody CrearAnuncioRequestDTO dto) {
        try {
            if (dto.getCreadorId() == null || dto.getInmuebleId() == null) {
                return ResponseEntity.badRequest().body("El ID del creador y del inmueble no deben ser nulos.");
            }

            CrearAnuncioResponseDTO anuncioCreado = anuncioApplicationService.crearAnuncio(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(anuncioCreado);

        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error interno al crear el anuncio.");
        }
    }


    @GetMapping("/properties-by-user")
    public ResponseEntity<List<InmuebleAnunciosDTO>> obtenerInmueblesPorUsuario(@RequestParam Long usuarioId) {
        List<InmuebleAnunciosDTO> resultado = anuncioApplicationService.obtenerInmueblesConAnuncios(usuarioId);
        return ResponseEntity.ok(resultado);
    }


    @GetMapping("/historial/{anuncioId}")
    public Map<String, List<HistorialDTO>> obtenerHistorial(@PathVariable Long anuncioId) {
        return anuncioApplicationService.obtenerHistorialAgrupado(anuncioId);
    }


    @GetMapping("/by-property/{inmuebleId}")
    public ResponseEntity<PaginaAnunciosDTO> obtenerAnunciosPorInmueble(
            @PathVariable Long inmuebleId,
            @RequestParam Long usuarioId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        PaginaAnunciosDTO respuesta = anuncioApplicationService.obtenerAnunciosPorInmueble(inmuebleId, usuarioId, page, size);
        return ResponseEntity.ok(respuesta);
    }

    @GetMapping("/detail/{anuncioId}")
    public ResponseEntity<DetalleAnuncioDTO> obtenerDetalleAnuncio(
            @PathVariable Long anuncioId,
            @RequestParam Long usuarioId
    ) {
        DetalleAnuncioDTO detalle = anuncioApplicationService.obtenerDetalleAnuncio(anuncioId, usuarioId);
        return ResponseEntity.ok(detalle);
    }

    @PostMapping("/mark-as-read/{anuncioId}")
    public ResponseEntity<Void> marcarAnuncioComoLeido(
            @PathVariable Long anuncioId,
            @RequestParam("usuarioId") Long usuarioId
    ) {
        anuncioApplicationService.marcarAnuncioComoLeido(anuncioId, usuarioId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{anuncioId}")
    public ResponseEntity<AnuncioModificadoDTO> modificarAnuncio(
            @PathVariable Long anuncioId,
            @RequestBody ModificarAnuncioRequestDTO dto
    ) {
        AnuncioModificadoDTO respuesta = anuncioApplicationService.moodificarAnuncio(anuncioId, dto);
        return ResponseEntity.ok(respuesta);
    }

    @DeleteMapping("/{anuncioId}")
    public ResponseEntity<?> eliminarAnuncio(@PathVariable Long anuncioId) {

        try {
            anuncioApplicationService.eliminarAnuncio(anuncioId);

            return ResponseEntity.noContent().build(); // 204

        } catch (IllegalArgumentException e) {

            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Anuncio no encontrado");

        } catch (IllegalStateException e) {

            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El anuncio no puede ser eliminado en su estado actual");

        } catch (Exception e) {

            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno al eliminar el anuncio");
        }
    }

    @PostMapping("/confirmar-urgente/{anuncioId}")
    public ResponseEntity<Void> confirmarUrgente(
            @PathVariable Long anuncioId,
            @RequestParam Long usuarioId
    ) {
        anuncioApplicationService.confirmarLecturaUrgente(anuncioId, usuarioId);
        return ResponseEntity.ok().build();
    }


}