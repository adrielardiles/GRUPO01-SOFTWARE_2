/*package com.edu.roomieyabackend.model.entities.AnunciosTipos;

import com.edu.roomieyabackend.dto.CrearAnuncioRequestDTO;
import com.edu.roomieyabackend.model.Enums.EstadoAnuncio;
import com.edu.roomieyabackend.model.Enums.TipoAnuncio;
import com.edu.roomieyabackend.model.entities.Anuncio;
import com.edu.roomieyabackend.model.entities.Inmueble;
import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.model.interfaces.AnuncioTipoStrategy;
import com.edu.roomieyabackend.model.interfaces.RegistrableAnuncioStrategy;
import org.springframework.stereotype.Component;

@Component
public class ProgramadoAnuncioStrategy extends AnuncioStrategyBase implements RegistrableAnuncioStrategy {

    @Override
    public Anuncio inicializar(CrearAnuncioRequestDTO dto, Usuario creador, Inmueble inmueble) {
        Anuncio a = crearBase(dto, creador, inmueble);
        a.setEstado(EstadoAnuncio.PROGRAMADO);
        a.setFechaPublicacion(dto.fechaProgramada);
        a.setRequiereConfirmacion(dto.requiereConfirmacion); // respetar DTO
        return a;
    }

    @Override
    public TipoAnuncio tipo() {
        return TipoAnuncio.PROGRAMADO;
    }
}
 */