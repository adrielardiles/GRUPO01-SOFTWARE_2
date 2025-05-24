package com.edu.roomieyabackend.strategy;

import com.edu.roomieyabackend.model.Pago;
import com.edu.roomieyabackend.exception.MetodoPagoNoSoportadoException;
import org.springframework.stereotype.Component;

@Component
public class TarjetaPagoStrategy implements PagoStrategy {

    @Override
    public void procesarPago(Pago pago) {
        if (pago.getMonto() <= 0) {
            throw new MetodoPagoNoSoportadoException("Monto inválido para tarjeta");
        }

        // Simulamos lógica: tarjetas aceptan montos de S/10 a S/2000
        if (pago.getMonto() < 10 || pago.getMonto() > 2000) {
            throw new MetodoPagoNoSoportadoException("Monto fuera del rango permitido para tarjeta");
        }

        // Aquí podrías validar número de tarjeta, CVC, etc.
        System.out.println("Pago procesado con Tarjeta");
    }
}
