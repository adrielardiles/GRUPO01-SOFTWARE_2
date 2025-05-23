package com.edu.roomieyabackend.model.entities.AnunciosTipos;


import com.edu.roomieyabackend.dto.ResumenAnuncioDTO;
import com.edu.roomieyabackend.model.entities.Anuncio;
import com.edu.roomieyabackend.model.entities.LecturaAnuncio;
import com.edu.roomieyabackend.model.interfaces.Command;
import com.edu.roomieyabackend.repository.AnuncioRepository;
import com.edu.roomieyabackend.repository.LecturaAnuncioRepository;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class ObtenerAnunciosPorInmuebleCommand implements Command<List<ResumenAnuncioDTO>> {

    private final Long inmuebleId;
    private final Long usuarioId;

    private final AnuncioRepository anuncioRepository;
    private final LecturaAnuncioRepository lecturaAnuncioRepository;

    public ObtenerAnunciosPorInmuebleCommand(
            Long inmuebleId,
            Long usuarioId,
            AnuncioRepository anuncioRepository,
            LecturaAnuncioRepository lecturaAnuncioRepository
    ) {
        this.inmuebleId = inmuebleId;
        this.usuarioId = usuarioId;
        this.anuncioRepository = anuncioRepository;
        this.lecturaAnuncioRepository = lecturaAnuncioRepository;
    }

    @Override
    public List<ResumenAnuncioDTO> ejecutar() {
        List<Anuncio> anuncios = anuncioRepository.findByInmuebleId(inmuebleId);
        List<ResumenAnuncioDTO> dtos = new ArrayList<>();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

        for (Anuncio a : anuncios) {
            boolean leido = lecturaAnuncioRepository
                    .findByAnuncioIdAndUsuarioId(a.getId(), usuarioId)
                    .map(LecturaAnuncio::isLeido)
                    .orElse(false); // 🔥 Se considera no leído si no existe el registro

            ResumenAnuncioDTO dto = new ResumenAnuncioDTO(
                    a.getId(),
                    a.getTitulo(),
                    a.getFechaPublicacion().format(formatter),
                    a.getTipo().name(),
                    leido
            );
            dtos.add(dto);
        }



        // Orden personalizado: urgentes no leídos > no leídos > urgentes leídos > demás
        Comparator<ResumenAnuncioDTO> comparator = Comparator
                .comparingInt((ResumenAnuncioDTO dto) -> {
                    if (!dto.isRead() && dto.getTipo().equalsIgnoreCase("URGENTE")) return 1;
                    if (!dto.isRead()) return 2;
                    if (dto.getTipo().equalsIgnoreCase("URGENTE")) return 3;
                    return 4;
                })
                .thenComparing((ResumenAnuncioDTO dto) -> {
                    try {
                        return LocalDate.parse(dto.getCreatedAt(), formatter);
                    } catch (Exception e) {
                        return LocalDate.MIN;
                    }
                }, Comparator.reverseOrder());


        return dtos.stream()
                .sorted(comparator)
                .collect(Collectors.toList());
    }
}