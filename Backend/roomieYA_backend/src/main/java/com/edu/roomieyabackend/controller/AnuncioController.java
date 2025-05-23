package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.dto.*;
import com.edu.roomieyabackend.model.entities.Anuncio;
import com.edu.roomieyabackend.service.AnuncioApplicationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/anuncios")
public class AnuncioController {

    private final AnuncioApplicationService anuncioApplicationService;

    public AnuncioController(AnuncioApplicationService anuncioApplicationService) {
        this.anuncioApplicationService = anuncioApplicationService;
    }

    @PostMapping
    public ResponseEntity<?> crearAnuncio(@RequestBody CrearAnuncioRequestDTO dto) {
        try {
            System.out.println("===== [INICIO] crearAnuncio =====");
            System.out.println("DTO recibido: " + dto);

            if (dto.getCreadorId() == null || dto.getInmuebleId() == null) {
                System.out.println("ID de creador o inmueble es null");
                return ResponseEntity.badRequest().body("El ID del creador y del inmueble no deben ser nulos.");
            }

            CrearAnuncioResponseDTO anuncioCreado = anuncioApplicationService.crearAnuncio(dto);

            System.out.println("✅ Anuncio creado con ID: " + anuncioCreado.getId());
            System.out.println("===== [FIN] crearAnuncio =====");

            return ResponseEntity.status(HttpStatus.CREATED).body(anuncioCreado);

        } catch (IllegalArgumentException e) {
            System.out.println("Excepción de argumento inválido: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error en los datos: " + e.getMessage());

        } catch (Exception e) {
            System.out.println("Excepción inesperada al crear anuncio:");
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor");
        }
    }

    @GetMapping("/properties-by-user")
    public ResponseEntity<List<InmuebleAnunciosDTO>> obtenerInmueblesPorUsuario(@RequestParam Long usuarioId) {
        List<InmuebleAnunciosDTO> resultado = anuncioApplicationService.obtenerInmueblesConResumen(usuarioId);
        return ResponseEntity.ok(resultado);
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
        System.out.println("DELETE] Intentando eliminar anuncio con ID: " + anuncioId);
        try {
            anuncioApplicationService.eliminarAnuncio(anuncioId);
            System.out.println("Anuncio eliminado correctamente: " + anuncioId);
            return ResponseEntity.noContent().build(); // 204

        } catch (IllegalArgumentException e) {
            System.out.println("[NOT FOUND] No se encontró el anuncio con ID: " + anuncioId);
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Anuncio no encontrado");

        } catch (IllegalStateException e) {
            System.out.println("[CONFLICT] Estado inválido para eliminar el anuncio con ID: " + anuncioId);
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El anuncio no puede ser eliminado en su estado actual");

        } catch (Exception e) {
            System.out.println("[ERROR] Error inesperado al eliminar anuncio con ID: " + anuncioId);
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