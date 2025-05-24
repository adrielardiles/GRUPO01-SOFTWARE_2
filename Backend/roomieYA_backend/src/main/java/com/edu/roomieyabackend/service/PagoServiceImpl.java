package com.edu.roomieyabackend.service.impl;

import com.edu.roomieyabackend.model.Pago;
import com.edu.roomieyabackend.repository.PagoRepository;
import com.edu.roomieyabackend.service.PagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PagoServiceImpl implements PagoService {

    private final PagoRepository pagoRepository;

    @Autowired
    public PagoServiceImpl(PagoRepository pagoRepository) {
        this.pagoRepository = pagoRepository;
    }

    @Override
    public Pago registrarPago(Pago pago) {
        return pagoRepository.save(pago);
    }

    @Override
    public List<Pago> listarPagosPorUsuario(Long usuarioId) {
        return pagoRepository.findByUsuarioId(usuarioId);
    }

    @Override
    public List<Pago> listarTodosLosPagos() {
        return pagoRepository.findAll();
    }

    @Override
    public Optional<Pago> obtenerPagoPorId(Long id) {
        return pagoRepository.findById(id);
    }

    @Override
    public boolean eliminarPago(Long id) {
        if (pagoRepository.existsById(id)) {
            pagoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
