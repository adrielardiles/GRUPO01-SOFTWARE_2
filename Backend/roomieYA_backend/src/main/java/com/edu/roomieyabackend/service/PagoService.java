package com.edu.roomieyabackend.service;

import com.edu.roomieyabackend.model.Pago;

import java.util.List;
import java.util.Optional;

public interface PagoService {
    Pago registrarPago(Pago pago);
    List<Pago> listarPagosPorUsuario(Long usuarioId);
    List<Pago> listarTodosLosPagos();
    Optional<Pago> obtenerPagoPorId(Long id);
    boolean eliminarPago(Long id);
}
