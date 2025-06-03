package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.model.Pago;
import com.edu.roomieyabackend.service.PagoService;
import com.edu.roomieyabackend.strategy.PagoStrategy;
import com.edu.roomieyabackend.strategy.PagoStrategyFactory;
import com.edu.roomieyabackend.exception.MetodoPagoNoSoportadoException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/pagos")
public class PagoController {

    private final PagoService pagoService;
    private final PagoStrategyFactory strategyFactory;

    public PagoController(PagoService pagoService, PagoStrategyFactory strategyFactory) {
        this.pagoService = pagoService;
        this.strategyFactory = strategyFactory;
    }

    @PostMapping("/realizar")
    public ResponseEntity<Pago> realizarPago(@RequestBody Pago pago) {
        validarPago(pago);

        if (pago.getFecha() == null) {
            pago.setFecha(LocalDate.now());
        }

        PagoStrategy estrategia = strategyFactory.obtenerEstrategia(pago.getMetodoPago());
        if (estrategia == null) {
            throw new MetodoPagoNoSoportadoException("Método de pago no soportado: " + pago.getMetodoPago());
        }

        estrategia.procesarPago(pago); // Aquí se puede validar, loggear o aplicar lógicas específicas

        Pago guardado = pagoService.registrarPago(pago);
        return ResponseEntity.ok(guardado);
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<List<Pago>> historial(@PathVariable Long id) {
        return ResponseEntity.ok(pagoService.listarPagosPorUsuario(id));
    }

    private void validarPago(Pago pago) {
        if (pago.getMonto() == null || pago.getMetodoPago() == null || pago.getUsuarioId() == null) {
            throw new IllegalArgumentException("Datos incompletos para procesar el pago");
        }
    }
}
