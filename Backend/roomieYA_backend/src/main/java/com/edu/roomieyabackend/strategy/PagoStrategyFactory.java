package com.edu.roomieyabackend.strategy;

import com.edu.roomieyabackend.exception.MetodoPagoNoSoportadoException;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class PagoStrategyFactory {

    private final Map<String, PagoStrategy> estrategias = new HashMap<>();

    public PagoStrategyFactory() {
        estrategias.put("yape", new YapePagoStrategy());
        estrategias.put("tarjeta", new TarjetaPagoStrategy());
    }

    public PagoStrategy obtenerEstrategia(String metodoPago) {
        PagoStrategy estrategia = estrategias.get(metodoPago.toLowerCase());
        if (estrategia == null) {
            throw new MetodoPagoNoSoportadoException("Método de pago no soportado: " + metodoPago);
        }
        return estrategia;
    }
}
