package com.edu.roomieyabackend.service;

import com.edu.roomieyabackend.model.Pago;

import java.util.List;


public interface PagoService {

    Pago registrarPago(Pago pago);

    List<Pago> listarPagosPorUsuario(Long usuarioId);
}
