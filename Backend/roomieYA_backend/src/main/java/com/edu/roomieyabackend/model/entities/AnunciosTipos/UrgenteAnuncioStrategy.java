package com.edu.roomieyabackend.model.entities.AnunciosTipos;

import com.edu.roomieyabackend.dto.CrearAnuncioRequestDTO;
import com.edu.roomieyabackend.model.Enums.EstadoAnuncio;
import com.edu.roomieyabackend.model.Enums.TipoAnuncio;
import com.edu.roomieyabackend.model.entities.Anuncio;
import com.edu.roomieyabackend.model.entities.Inmueble;
import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.model.interfaces.AnuncioTipoStrategy;
import com.edu.roomieyabackend.model.interfaces.RegistrableAnuncioStrategy;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class UrgenteAnuncioStrategy extends AnuncioStrategyBase implements RegistrableAnuncioStrategy {

    @Override
    public Anuncio inicializar(CrearAnuncioRequestDTO dto, Usuario creador, Inmueble inmueble) {
        Anuncio a = crearBase(dto, creador, inmueble);
        a.setRequiereConfirmacion(true);
        return a;
    }

    @Override
    public TipoAnuncio tipo() {
        return TipoAnuncio.URGENTE;
    }
}
