package com.edu.roomieyabackend.service;

import com.edu.roomieyabackend.dto.*;
import com.edu.roomieyabackend.model.Enums.EstadoAnuncio;
import com.edu.roomieyabackend.model.Enums.TipoAnuncio;
import com.edu.roomieyabackend.model.entities.Anuncio;
import com.edu.roomieyabackend.model.entities.AnunciosTipos.*;
import com.edu.roomieyabackend.model.entities.Inmueble;
import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.model.interfaces.*;
import com.edu.roomieyabackend.repository.*;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Service
public class AnuncioApplicationService {

    private final UsuarioRepository usuarioRepository;
    private final InmuebleRepository inmuebleRepository;
    private final UsuarioInmuebleRepository usuarioInmuebleRepository;
    private final LecturaAnuncioRepository lecturaAnuncioRepository;
    private final AnuncioRepository anuncioRepository;
    private final AnuncioFactory anuncioFactory;
    private final ObservableAnuncio observableAnuncio;
    private final DestinatarioService destinatarioService;
    private final NotificacionService notificacionService;

    public AnuncioApplicationService(
            UsuarioRepository usuarioRepository,
            InmuebleRepository inmuebleRepository,
            UsuarioInmuebleRepository usuarioInmuebleRepository,
            LecturaAnuncioRepository lecturaAnuncioRepository,
            AnuncioRepository anuncioRepository,
            AnuncioFactory anuncioFactory,
            ObservableAnuncio observableAnuncio,
            DestinatarioService destinatarioService,
            NotificacionService notificacionService,
            LecturaObserver lecturaObserver,
            NotificacionObserver notificacionObserver
    ) {
        this.usuarioRepository = usuarioRepository;
        this.inmuebleRepository = inmuebleRepository;
        this.usuarioInmuebleRepository = usuarioInmuebleRepository;
        this.lecturaAnuncioRepository = lecturaAnuncioRepository;
        this.anuncioRepository = anuncioRepository;
        this.anuncioFactory = anuncioFactory;
        this.observableAnuncio = observableAnuncio;
        this.destinatarioService = destinatarioService;
        this.notificacionService = notificacionService;
    }

    @PostConstruct
    public void inicializarObservers() {
        observableAnuncio.agregarObserver(new LecturaObserver(inmuebleRepository, lecturaAnuncioRepository));
        observableAnuncio.agregarObserver(new NotificacionObserver(destinatarioService, notificacionService, lecturaAnuncioRepository));
    }

    @Transactional
    public CrearAnuncioResponseDTO crearAnuncio(CrearAnuncioRequestDTO dto) {
        Usuario creador = usuarioRepository.findById(dto.getCreadorId())
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        Inmueble inmueble = inmuebleRepository.findById(dto.getInmuebleId())
                .orElseThrow(() -> new IllegalArgumentException("Inmueble no encontrado"));

        Anuncio anuncio = new Anuncio();
        anuncio.setTitulo(dto.getTitulo());
        anuncio.setDescripcion(dto.getDescripcion());
        anuncio.setTipo(TipoAnuncio.valueOf(dto.getTipo()));
        anuncio.setArchivoAdjuntoUrl(dto.getArchivoAdjuntoUrl());
        anuncio.setInmueble(inmueble);
        anuncio.setCreador(creador);
        anuncio.setEstado(EstadoAnuncio.PUBLICADO);
        anuncio.setFechaPublicacion(LocalDateTime.now());

        anuncioRepository.save(anuncio);
        observableAnuncio.notificarObservers(anuncio);

        return new CrearAnuncioResponseDTO(
                anuncio.getId(),
                anuncio.getTitulo(),
                anuncio.getDescripcion(),
                anuncio.getTipo(),
                anuncio.getEstado(),
                anuncio.getFechaPublicacion(),
                creador.getNombreCompleto()
        );
    }

    public List<InmuebleAnunciosDTO> obtenerInmueblesConResumen(Long usuarioId) {
        ObtenerInmueblesConAnunciosCommand command = new ObtenerInmueblesConAnunciosCommand(
                usuarioId,
                usuarioInmuebleRepository,
                anuncioRepository,
                lecturaAnuncioRepository
        );
        return command.ejecutar();
    }

    public PaginaAnunciosDTO obtenerAnunciosPorInmueble(Long inmuebleId, Long usuarioId, int page, int size) {
        ObtenerAnunciosPorInmuebleCommand command = new ObtenerAnunciosPorInmuebleCommand(
                inmuebleId,
                usuarioId,
                anuncioRepository,
                lecturaAnuncioRepository
        );

        List<ResumenAnuncioDTO> anunciosOrdenados = command.ejecutar();
        int totalElementos = anunciosOrdenados.size();
        int totalPaginas = (int) Math.ceil((double) totalElementos / size);

        int fromIndex = Math.min((page - 1) * size, totalElementos);
        int toIndex = Math.min(fromIndex + size, totalElementos);

        List<ResumenAnuncioDTO> paginados = (fromIndex >= toIndex)
                ? Collections.emptyList()
                : anunciosOrdenados.subList(fromIndex, toIndex);

        return new PaginaAnunciosDTO(paginados, page, totalPaginas, totalElementos);
    }

    public DetalleAnuncioDTO obtenerDetalleAnuncio(Long anuncioId, Long usuarioId) {
        usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        ObtenerDetalleAnuncioCommand command = new ObtenerDetalleAnuncioCommand(
                anuncioId,
                usuarioId,
                anuncioRepository,
                lecturaAnuncioRepository
        );
        return command.ejecutar();
    }

    public void marcarAnuncioComoLeido(Long anuncioId, Long usuarioId) {
        MarcarAnuncioComoLeidoCommand command = new MarcarAnuncioComoLeidoCommand(
                anuncioId,
                usuarioId,
                anuncioRepository,
                usuarioRepository,
                lecturaAnuncioRepository
        );
        command.ejecutar();
    }

    public AnuncioModificadoDTO moodificarAnuncio(Long anuncioId, ModificarAnuncioRequestDTO dto) {
        ModificarAnuncioCommand command = new ModificarAnuncioCommand(
                anuncioId,
                dto,
                anuncioRepository,
                usuarioRepository
        );

        Anuncio actualizado = command.ejecutar();

        return new AnuncioModificadoDTO(
                actualizado.getId(),
                actualizado.getTitulo(),
                actualizado.getDescripcion(),
                actualizado.getTipo(),
                actualizado.getFechaPublicacion(),
                actualizado.getCreador().getNombreCompleto()
        );
    }

    public void eliminarAnuncio(Long anuncioId) {
        EliminarAnuncioCommand command = new EliminarAnuncioCommand(
                anuncioId,
                anuncioRepository,
                lecturaAnuncioRepository
        );
        command.ejecutar();
    }

    public void confirmarLecturaUrgente(Long anuncioId, Long usuarioId) {
        ConfirmarLecturaUrgenteCommand command = new ConfirmarLecturaUrgenteCommand(
                anuncioId, usuarioId, lecturaAnuncioRepository
        );
        command.ejecutar();
    }
}
