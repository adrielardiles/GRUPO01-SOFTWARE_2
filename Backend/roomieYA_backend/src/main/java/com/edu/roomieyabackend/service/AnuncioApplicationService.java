package com.edu.roomieyabackend.service;

import com.edu.roomieyabackend.dto.*;
import com.edu.roomieyabackend.model.Enums.TipoEventoAnuncio;
import com.edu.roomieyabackend.model.entities.Anuncio;
import com.edu.roomieyabackend.model.entities.AnunciosTipos.*;
import com.edu.roomieyabackend.model.entities.Historial.historialCommand;
import com.edu.roomieyabackend.model.interfaces.*;
import com.edu.roomieyabackend.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AnuncioApplicationService {

    private final UsuarioRepository usuarioRepository;
    private final InmuebleRepository inmuebleRepository;
    private final UsuarioInmuebleRepository usuarioInmuebleRepository;
    private final LecturaAnuncioRepository lecturaAnuncioRepository;
    private final AnuncioRepository anuncioRepository;
    private final AnuncioFacade anuncioFacade;
    private final ObservableAnuncio observableAnuncio;
    private final LecturaObserver lecturaObserver;

    public AnuncioApplicationService(
            UsuarioRepository usuarioRepository,
            InmuebleRepository inmuebleRepository,
            UsuarioInmuebleRepository usuarioInmuebleRepository,
            LecturaAnuncioRepository lecturaAnuncioRepository,
            AnuncioRepository anuncioRepository,
            AnuncioFacade anuncioFacade,
            ObservableAnuncio observableAnuncio,
            LecturaObserver lecturaObserver
    ) {
        this.usuarioRepository = usuarioRepository;
        this.inmuebleRepository = inmuebleRepository;
        this.usuarioInmuebleRepository = usuarioInmuebleRepository;
        this.lecturaAnuncioRepository = lecturaAnuncioRepository;
        this.anuncioRepository = anuncioRepository;
        this.anuncioFacade = anuncioFacade;
        this.observableAnuncio = observableAnuncio;
        this.lecturaObserver = lecturaObserver;

        System.out.println("🟢 Constructor AnuncioApplicationService - Observable ID: " + System.identityHashCode(observableAnuncio));
        System.out.println("🟢 Constructor AnuncioApplicationService - Observer ID: " + System.identityHashCode(lecturaObserver));

        // Solo se registra una vez
        this.observableAnuncio.agregarObserver(lecturaObserver);
    }

    public Map<String, List<HistorialDTO>> obtenerHistorialAgrupado(Long anuncioId) {
        // Ejecutar el Command
        historialCommand command = new historialCommand(lecturaAnuncioRepository, anuncioId);
        List<HistorialDTO> historial = (List<HistorialDTO>) command.ejecutar();

        // Agrupar en leídos y no leídos
        Map<String, List<HistorialDTO>> resultado = new HashMap<>();
        resultado.put("leidos", historial.stream().filter(HistorialDTO::isLeido).collect(Collectors.toList()));
        resultado.put("noLeidos", historial.stream().filter(h -> !h.isLeido()).collect(Collectors.toList()));

        return resultado;
    }

    @Transactional
    public CrearAnuncioResponseDTO crearAnuncio(CrearAnuncioRequestDTO dto) {
        CrearAnuncioCommand command = new CrearAnuncioCommand(
                dto,
                usuarioRepository,
                inmuebleRepository,
                anuncioRepository,
                anuncioFacade
        );

        Anuncio anuncioGuardado = command.ejecutar();

        System.out.println("🔵 Notificando desde observable (ApplicationService) - ID: " + System.identityHashCode(observableAnuncio));
        observableAnuncio.notificarObservers(anuncioGuardado, TipoEventoAnuncio.CREACION);

        return new CrearAnuncioResponseDTO(
                anuncioGuardado.getId(),
                anuncioGuardado.getTitulo(),
                anuncioGuardado.getDescripcion(),
                anuncioGuardado.getTipo(),
                anuncioGuardado.getEstado(),
                anuncioGuardado.getFechaPublicacion(),
                anuncioGuardado.getCreador().getNombreCompleto()
        );
    }


    public List<InmuebleAnunciosDTO> obtenerInmueblesConAnuncios(Long usuarioId) {
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
    @Transactional
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
