package com.edu.roomieyabackend.service;

import com.edu.roomieyabackend.model.GastoCompartido;
import com.edu.roomieyabackend.model.NotificacionPago;
import com.edu.roomieyabackend.repository.GastoCompartidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GastoCompartidoService {

    @Autowired
    private GastoCompartidoRepository gastoCompartidoRepository;

    @Autowired
    private NotificacionPagoService notificacionPagoService;

    // Crear un nuevo gasto compartido y su notificación
    public GastoCompartido crearGastoCompartido(GastoCompartido gastoCompartido) {
        GastoCompartido nuevoGasto = gastoCompartidoRepository.save(gastoCompartido);

        // Crear el mensaje de la notificación
        String mensaje = gastoCompartido.getParticipantes().isEmpty()
                ? "Se registró un gasto de S/ " + gastoCompartido.getMonto() + " por " + gastoCompartido.getCategoria()
                : gastoCompartido.getParticipantes().get(0) + " pagó S/ " + gastoCompartido.getMonto() + " por " + gastoCompartido.getCategoria();

        String fecha = gastoCompartido.getFecha();

        NotificacionPago notificacion = new NotificacionPago(mensaje, fecha);
        notificacionPagoService.guardar(notificacion);

        return nuevoGasto;
    }

    public List<GastoCompartido> obtenerGastosCompartidos() {
        return gastoCompartidoRepository.findAll();
    }

    public Optional<GastoCompartido> obtenerGastoPorId(Long id) {
        return gastoCompartidoRepository.findById(id);
    }

    public boolean eliminarGasto(Long id) {
        if (gastoCompartidoRepository.existsById(id)) {
            gastoCompartidoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
