package com.edu.roomieyabackend.model.entities.AnunciosTipos;


import com.edu.roomieyabackend.model.entities.Anuncio;
import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.model.interfaces.DestinatarioService;
import com.edu.roomieyabackend.repository.InmuebleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DefaultDestinatarioService implements DestinatarioService {

    private final InmuebleRepository inmuebleRepository;

    public DefaultDestinatarioService(InmuebleRepository inmuebleRepository) {
        this.inmuebleRepository = inmuebleRepository;
    }

    @Override
    public List<Usuario> obtenerPara(Anuncio anuncio) {
        Long inmuebleId = anuncio.getInmueble().getId();
        return inmuebleRepository.obtenerRoomiesPorInmueble(inmuebleId);
    }
}