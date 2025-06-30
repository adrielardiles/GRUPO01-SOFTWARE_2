package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.model.GastoCompartido;
import com.edu.roomieyabackend.model.NotificacionPago;
import com.edu.roomieyabackend.service.GastoCompartidoService;
import com.edu.roomieyabackend.service.NotificacionPagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/gastos-compartidos")
public class GastoCompartidoController {

    @Autowired
    private GastoCompartidoService gastoCompartidoService;

    @Autowired
    private NotificacionPagoService notificacionPagoService;

    @GetMapping
    public List<GastoCompartido> getAllGastos() {
        return gastoCompartidoService.obtenerGastosCompartidos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GastoCompartido> getGastoById(@PathVariable Long id) {
        Optional<GastoCompartido> optionalGasto = gastoCompartidoService.obtenerGastoPorId(id);
        return optionalGasto.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<GastoCompartido> crearGasto(@RequestBody GastoCompartido gastoCompartido) {
        GastoCompartido nuevoGasto = gastoCompartidoService.crearGastoCompartido(gastoCompartido);

        // ⚠️ Generar mensaje para la notificación
        String participantes = String.join(", ", gastoCompartido.getParticipantes());
        String mensaje = String.format("%s pagó S/ %.2f por %s", participantes, gastoCompartido.getMonto(), gastoCompartido.getCategoria());

        // ⚠️ Crear notificación
        NotificacionPago notificacion = new NotificacionPago();
        notificacion.setMensaje(mensaje);
        notificacion.setFecha(gastoCompartido.getFecha());
        notificacion.setLeida(false);

        // Guardar notificación
        notificacionPagoService.guardar(notificacion);

        return ResponseEntity.status(201).body(nuevoGasto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarGasto(@PathVariable Long id) {
        boolean eliminado = gastoCompartidoService.eliminarGasto(id);
        if (eliminado) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<GastoCompartido> actualizarGasto(@PathVariable Long id, @RequestBody GastoCompartido gastoCompartido) {
        Optional<GastoCompartido> gastoExistente = gastoCompartidoService.obtenerGastoPorId(id);
        if (gastoExistente.isPresent()) {
            gastoCompartido.setId(id);
            GastoCompartido gastoActualizado = gastoCompartidoService.crearGastoCompartido(gastoCompartido);
            return ResponseEntity.ok(gastoActualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
