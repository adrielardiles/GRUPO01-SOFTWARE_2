package com.edu.roomieyabackend.strategy;

import com.edu.roomieyabackend.model.Pago;
import com.edu.roomieyabackend.exception.MetodoPagoNoSoportadoException;
import org.springframework.stereotype.Component;

@Component
public class YapePagoStrategy implements PagoStrategy {

    @Override
    public void procesarPago(Pago pago) {
        if (pago.getMonto() <= 0) {
            throw new MetodoPagoNoSoportadoException("Monto inválido para Yape");
        }
        if (pago.getMonto() > 500) {
            throw new MetodoPagoNoSoportadoException("Yape no permite montos mayores a S/500");
        }

        // Aquí podrías agregar lógica adicional como validación de número de teléfono Yape
        System.out.println("Pago procesado con Yape");
    }
}
