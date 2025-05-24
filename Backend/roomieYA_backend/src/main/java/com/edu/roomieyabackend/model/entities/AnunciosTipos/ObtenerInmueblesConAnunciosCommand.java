package com.edu.roomieyabackend.model.entities.AnunciosTipos;

import com.edu.roomieyabackend.dto.InmuebleAnunciosDTO;
import com.edu.roomieyabackend.model.Enums.RolPorInmueble;
import com.edu.roomieyabackend.model.entities.Anuncio;
import com.edu.roomieyabackend.model.entities.Inmueble;
import com.edu.roomieyabackend.model.entities.UsuarioInmueble;
import com.edu.roomieyabackend.model.interfaces.Command;
import com.edu.roomieyabackend.repository.AnuncioRepository;
import com.edu.roomieyabackend.repository.LecturaAnuncioRepository;
import com.edu.roomieyabackend.repository.UsuarioInmuebleRepository;

import java.util.ArrayList;
import java.util.List;

public class ObtenerInmueblesConAnunciosCommand implements Command<List<InmuebleAnunciosDTO>> {

    private final Long usuarioId;
    private final UsuarioInmuebleRepository usuarioInmuebleRepository;
    private final AnuncioRepository anuncioRepository;
    private final LecturaAnuncioRepository lecturaAnuncioRepository;

    public ObtenerInmueblesConAnunciosCommand(
            Long usuarioId,
            UsuarioInmuebleRepository usuarioInmuebleRepository,
            AnuncioRepository anuncioRepository,
            LecturaAnuncioRepository lecturaAnuncioRepository
    ) {
        this.usuarioId = usuarioId;
        this.usuarioInmuebleRepository = usuarioInmuebleRepository;
        this.anuncioRepository = anuncioRepository;
        this.lecturaAnuncioRepository = lecturaAnuncioRepository;
    }

    @Override
    public List<InmuebleAnunciosDTO> ejecutar() {
        List<UsuarioInmueble> vinculos = usuarioInmuebleRepository.findByUsuarioId(usuarioId);
        List<InmuebleAnunciosDTO> resultado = new ArrayList<>();

        for (UsuarioInmueble vinculo : vinculos) {
            Inmueble inmueble = vinculo.getInmueble();
            RolPorInmueble rol = vinculo.getRol();

            List<Anuncio> anuncios = anuncioRepository.findByInmuebleId(inmueble.getId());

            // Solo aplica hasUnread si el rol es ROOMIE
            boolean hasUnread = false;
            if (rol == RolPorInmueble.ROOMIE) {
                hasUnread = anuncios.stream().anyMatch(anuncio -> {
                    boolean esPublicado = anuncio.getEstado().esPublicado();
                    boolean esUrgente = anuncio.getTipo().name().equals("URGENTE");

                    return esPublicado && lecturaAnuncioRepository.findByAnuncioIdAndUsuarioId(anuncio.getId(), usuarioId)
                            .map(lectura -> {
                                if (esUrgente) {
                                    return !lectura.isConfirmacionLectura();
                                } else {
                                    return !lectura.isLeido();
                                }
                            }).orElse(false);
                });
            }


            InmuebleAnunciosDTO dto = new InmuebleAnunciosDTO(
                    inmueble.getId(),
                    inmueble.getNombre(),
                    rol.name().toLowerCase(), // "roomie" o "arrendador"
                    hasUnread
            );
            resultado.add(dto);
        }

        return resultado;
    }
}