package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.service.FiltroService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/filtros")
public class FiltroController {

    private final FiltroService filtroService;

    public FiltroController(FiltroService filtroService) {
        this.filtroService = filtroService;
    }

    // GET /api/filtros/tipos
    @GetMapping("/tipos")
    public List<String> getTipos() {
        List<String> tipos = filtroService.getTipos();

        // Normalización: eliminar nulos, espacios, duplicados y ordenar alfabéticamente
        return tipos.stream()
                .filter(Objects::nonNull)
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .map(s -> s.substring(0, 1).toUpperCase() + s.substring(1).toLowerCase()) // Primera letra mayúscula, resto minúscula
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }


    // GET /api/filtros/provincias
    @GetMapping("/provincias")
    public List<String> getProvincias() {
        List<String> provincias = filtroService.getProvincias();

        return provincias.stream()
                .filter(Objects::nonNull)
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .map(s -> s.substring(0, 1).toUpperCase() + s.substring(1).toLowerCase())
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }

    // GET /api/filtros/distritos?provincia=Lima
    @GetMapping("/distritos")
    public List<String> getDistritosPorProvincia(@RequestParam String provincia) {
        List<String> distritos = filtroService.getDistritosPorProvincia(provincia);

        return distritos.stream()
                .filter(Objects::nonNull)
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .map(s -> s.substring(0, 1).toUpperCase() + s.substring(1).toLowerCase())
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }

    // GET /api/filtros/caracteristicas
    @GetMapping("/caracteristicas")
    public List<String> getCaracteristicas() {
        List<String> caracteristicas = filtroService.getCaracteristicas();

        return caracteristicas.stream()
                .filter(Objects::nonNull)
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .map(s -> s.substring(0, 1).toUpperCase() + s.substring(1).toLowerCase())
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }
}
