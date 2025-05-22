package com.edu.roomieyabackend.service;

import com.edu.roomieyabackend.model.Pago;
import com.edu.roomieyabackend.repository.PagoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;


@Service
public class PagoServiceImpl implements PagoService {

    private final PagoRepository pagoRepository;

    @Autowired
    public PagoServiceImpl(PagoRepository pagoRepository) {
        this.pagoRepository = pagoRepository;
    }

    @Override
    public Pago registrarPago(Pago pago) {
        pago.setFecha(LocalDate.now());
        return pagoRepository.save(pago);
    }

    @Override
    public List<Pago> listarPagosPorUsuario(Long usuarioId) {
        return pagoRepository.findByUsuarioId(usuarioId);
    }
}
