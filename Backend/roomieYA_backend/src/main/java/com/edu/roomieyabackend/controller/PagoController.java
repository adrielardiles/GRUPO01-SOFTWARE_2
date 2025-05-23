package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.model.Pago;
import com.edu.roomieyabackend.service.PagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pagos")
@CrossOrigin(origins = "http://localhost:3000")
public class PagoController {

    private final PagoService pagoService;

    @Autowired
    public PagoController(PagoService pagoService) {
        this.pagoService = pagoService;
    }

    @GetMapping("/hello")
    public String hello() {
        return "¡El backend está funcionando!";
    }

    @PostMapping("/realizar")
    public ResponseEntity<Pago> realizarPago(@RequestBody Pago pago) {
        Pago nuevoPago = pagoService.registrarPago(pago);
        return ResponseEntity.ok(nuevoPago);
    }

    @GetMapping
    public ResponseEntity<List<Pago>> obtenerTodosLosPagos() {
        return ResponseEntity.ok(pagoService.listarTodosLosPagos());
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<List<Pago>> historialPorUsuario(@PathVariable("id") Long usuarioId) {
        return ResponseEntity.ok(pagoService.listarPagosPorUsuario(usuarioId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pago> obtenerPagoPorId(@PathVariable Long id) {
        Optional<Pago> pago = pagoService.obtenerPagoPorId(id);
        return pago.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPago(@PathVariable Long id) {
        boolean eliminado = pagoService.eliminarPago(id);
        return eliminado ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
