package com.edu.roomieyabackend.model.entities.AnunciosTipos;

import com.edu.roomieyabackend.dto.DetalleAnuncioDTO;
import com.edu.roomieyabackend.model.entities.Anuncio;
import com.edu.roomieyabackend.model.entities.LecturaAnuncio;
import com.edu.roomieyabackend.model.interfaces.Command;
import com.edu.roomieyabackend.repository.AnuncioRepository;
import com.edu.roomieyabackend.repository.LecturaAnuncioRepository;

import java.time.format.DateTimeFormatter;

public class ObtenerDetalleAnuncioCommand implements Command<DetalleAnuncioDTO> {

    private final Long anuncioId;
    private final Long usuarioId;
    private final AnuncioRepository anuncioRepository;
    private final LecturaAnuncioRepository lecturaAnuncioRepository;

    public ObtenerDetalleAnuncioCommand(
            Long anuncioId,
            Long usuarioId,
            AnuncioRepository anuncioRepository,
            LecturaAnuncioRepository lecturaAnuncioRepository
    ) {
        this.anuncioId = anuncioId;
        this.usuarioId = usuarioId;
        this.anuncioRepository = anuncioRepository;
        this.lecturaAnuncioRepository = lecturaAnuncioRepository;
    }

    @Override
    public DetalleAnuncioDTO ejecutar() {
        Anuncio anuncio = anuncioRepository.findById(anuncioId)
                .orElseThrow(() -> new IllegalArgumentException("Anuncio no encontrado"));

        LecturaAnuncio lectura = lecturaAnuncioRepository
                .findByAnuncioIdAndUsuarioId(anuncioId, usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Lectura no encontrada"));

        boolean leido = lectura.isLeido();
        boolean confirmacionLectura = lectura.isConfirmacionLectura();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        String fechaFormateada = anuncio.getFechaPublicacion().format(formatter);

        DetalleAnuncioDTO dto = new DetalleAnuncioDTO(
                anuncio.getId(),
                anuncio.getTitulo(),
                anuncio.getDescripcion(),
                anuncio.getTipo().name(),
                fechaFormateada,
                anuncio.getCreador().getNombreCompleto(),
                leido
        );

        dto.setConfirmacionLectura(confirmacionLectura);
        return dto;
    }
}
