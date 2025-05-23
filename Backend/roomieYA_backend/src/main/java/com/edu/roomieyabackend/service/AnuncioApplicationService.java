/*package com.edu.roomieyabackend.service;

import com.edu.roomieyabackend.dto.CrearAnuncioRequestDTO;
import com.edu.roomieyabackend.model.entities.Anuncio;
//import com.edu.roomieyabackend.model.entities.AnunciosTipos.AnuncioFactory;
//import com.edu.roomieyabackend.model.entities.AnunciosTipos.CrearAnuncioCommand;
import com.edu.roomieyabackend.model.interfaces.ObservableAnuncio;
import com.edu.roomieyabackend.repository.AnuncioRepository;
import com.edu.roomieyabackend.repository.InmuebleRepository;
import com.edu.roomieyabackend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

@Service
public class AnuncioApplicationService {

    private final UsuarioRepository usuarioRepository;
    private final InmuebleRepository inmuebleRepository;
    private final AnuncioRepository anuncioRepository;
  //private final AnuncioFactory anuncioFactory;
    private final ObservableAnuncio observableAnuncio;

    public AnuncioApplicationService(
            UsuarioRepository usuarioRepository,
            InmuebleRepository inmuebleRepository,
            AnuncioRepository anuncioRepository,
            //AnuncioFactory anuncioFactory,
            ObservableAnuncio observableAnuncio
    ) {
        this.usuarioRepository = usuarioRepository;
        this.inmuebleRepository = inmuebleRepository;
        this.anuncioRepository = anuncioRepository;
        //this.anuncioFactory = anuncioFactory;
        this.observableAnuncio = observableAnuncio;
    }

    public Anuncio crearAnuncio(CrearAnuncioRequestDTO dto) {
        CrearAnuncioCommand command = new CrearAnuncioCommand(
                dto,
                usuarioRepository,
                inmuebleRepository,
                anuncioRepository,
                //anuncioFactory,
                observableAnuncio
        );
        return command.ejecutar();
    }
}
*/