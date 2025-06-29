package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.service.FiltroService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        return filtroService.getTipos();
    }

    // GET /api/filtros/provincias
    @GetMapping("/provincias")
    public List<String> getProvincias() {
        return filtroService.getProvincias();
    }

    // GET /api/filtros/distritos?provincia=Lima
    @GetMapping("/distritos")
    public List<String> getDistritosPorProvincia(@RequestParam String provincia) {
        return filtroService.getDistritosPorProvincia(provincia);
    }

    // GET /api/filtros/caracteristicas
    @GetMapping("/caracteristicas")
    public List<String> getCaracteristicas() {
        return filtroService.getCaracteristicas();
    }
}
