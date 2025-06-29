package com.edu.roomieyabackend.service;

import com.edu.roomieyabackend.model.entities.Caracteristica;
import com.edu.roomieyabackend.model.entities.Distrito;
import com.edu.roomieyabackend.model.entities.Provincia;
import com.edu.roomieyabackend.model.entities.TipoInmueble;
import com.edu.roomieyabackend.repository.*;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FiltroService {


    private final ProvinciaRepository provinciaRepository;
    private final DistritoRepository distritoRepository;

    private final InmuebleRepository inmuebleRepository;

    public FiltroService(

            ProvinciaRepository provinciaRepository,
            DistritoRepository distritoRepository
            , InmuebleRepository inmuebleRepository) {

        this.provinciaRepository = provinciaRepository;
        this.distritoRepository = distritoRepository;

        this.inmuebleRepository = inmuebleRepository;
    }

    public List<String> getTipos() {
        return inmuebleRepository.findDistinctTipos();
    }

    public List<String> getProvincias() {
        return provinciaRepository.findAll()
                .stream()
                .map(Provincia::getNombre)
                .collect(Collectors.toList());
    }

    public List<String> getDistritosPorProvincia(String provincia) {
        return distritoRepository.findByProvinciaNombre(provincia)
                .stream()
                .map(Distrito::getNombre)
                .collect(Collectors.toList());
    }

    public List<String> getCaracteristicas() {
        return inmuebleRepository.findDistinctServicios()
                .stream()
                .flatMap(s -> Arrays.stream(s.split(",")))
                .map(String::trim)
                .distinct()
                .collect(Collectors.toList());
    }
}
