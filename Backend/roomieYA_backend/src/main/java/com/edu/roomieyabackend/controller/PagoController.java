package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.model.Pago;
import com.edu.roomieyabackend.service.PagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para gestionar pagos de alquiler.
 */
@RestController
@RequestMapping("/api/pagos")
@CrossOrigin(origins = "http://localhost:3000") // permite conexión desde frontend local
public class PagoController {

    private final PagoService pagoService;

    @Autowired
    public PagoController(PagoService pagoService) {
        this.pagoService = pagoService;
    }

    
    @PostMapping("/realizar")
    public ResponseEntity<Pago> realizarPago(@RequestBody Pago pago) {
        Pago nuevoPago = pagoService.registrarPago(pago);
        return ResponseEntity.ok(nuevoPago);
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<List<Pago>> historialPorUsuario(@PathVariable("id") Long usuarioId) {
        List<Pago> historial = pagoService.listarPagosPorUsuario(usuarioId);
        return ResponseEntity.ok(historial);
    }
}
