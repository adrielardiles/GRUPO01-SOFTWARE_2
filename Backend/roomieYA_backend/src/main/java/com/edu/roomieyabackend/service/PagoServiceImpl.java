package com.edu.roomieyabackend.service;

import com.edu.roomieyabackend.model.Pago;
import com.edu.roomieyabackend.repository.PagoRepository;
import com.edu.roomieyabackend.strategy.PagoStrategy;
import com.edu.roomieyabackend.strategy.PagoStrategyFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PagoServiceImpl implements PagoService {

    private final PagoRepository pagoRepository;
    private final PagoStrategyFactory pagoStrategyFactory;

    public PagoServiceImpl(PagoRepository pagoRepository, PagoStrategyFactory pagoStrategyFactory) {
        this.pagoRepository = pagoRepository;
        this.pagoStrategyFactory = pagoStrategyFactory;
    }

    @Override
    public Pago registrarPago(Pago pago) {
        // Aplicar la estrategia antes de guardar el pago
        PagoStrategy strategy = pagoStrategyFactory.obtenerEstrategia(pago.getMetodoPago());
        strategy.procesarPago(pago);

        return pagoRepository.save(pago);
    }

    @Override
    public List<Pago> listarPagosPorUsuario(Long usuarioId) {
        return pagoRepository.findByUsuarioId(usuarioId);
    }
}
