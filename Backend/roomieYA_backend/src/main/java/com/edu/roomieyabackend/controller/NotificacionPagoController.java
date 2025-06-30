package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.model.NotificacionPago;
import com.edu.roomieyabackend.service.NotificacionPagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notificaciones")
public class NotificacionPagoController {

    @Autowired
    private NotificacionPagoService service;

    @GetMapping
    public List<NotificacionPago> listar() {
        return service.listar();
    }

    @PostMapping
    public NotificacionPago guardar(@RequestBody NotificacionPago notificacion) {
        return service.guardar(notificacion);
    }

    @PutMapping("/{id}/leida")
    public NotificacionPago marcarComoLeida(@PathVariable Long id) {
        return service.marcarComoLeida(id);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}
