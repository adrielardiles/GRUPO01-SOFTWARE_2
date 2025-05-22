package com.edu.roomieyabackend.model.entities.AnunciosTipos;

public class CrearAnuncioCommand implements Command<Anuncio> {

    private final CrearAnuncioRequestDTO dto;
    private final UsuarioRepository usuarioRepository;
    private final InmuebleRepository inmuebleRepository;
    private final AnuncioRepository anuncioRepository;
    private final AnuncioFactory anuncioFactory;
    private final ApplicationEventPublisher publisher;

    public CrearAnuncioCommand(...) { /* inyectado */ }

    @Override
    public Anuncio ejecutar() {
        Usuario creador = usuarioRepository.findById(dto.creadorId).orElseThrow();
        Inmueble inmueble = inmuebleRepository.findById(dto.inmuebleId).orElseThrow();
        Anuncio anuncio = anuncioFactory.crearDesdeDTO(dto, creador, inmueble);
        anuncioRepository.save(anuncio);

        if (anuncio.getEstado() == EstadoAnuncio.ACTIVO) {
            publisher.publishEvent(new AnuncioPublicadoEvent(anuncio));
        }

        return anuncio;
    }
}
