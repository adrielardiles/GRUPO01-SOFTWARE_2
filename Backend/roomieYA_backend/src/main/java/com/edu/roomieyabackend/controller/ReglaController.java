package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.model.entities.Regla;
import com.edu.roomieyabackend.repository.ReglaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reglas")
@CrossOrigin(origins = "http://localhost:3000")  // Permite el acceso desde el frontend React
public class ReglaController {

    @Autowired
    private ReglaRepository reglaRepository;

    // Crear regla
    @PostMapping
    public ResponseEntity<Regla> crearRegla(@RequestBody Regla regla) {
        regla.setAceptada(false); // Al crear siempre es pendiente
        Regla nuevaRegla = reglaRepository.save(regla);
        return ResponseEntity.ok(nuevaRegla);
    }

    // Listar reglas pendientes
    @GetMapping("/pendientes")
    public List<Regla> listarReglasPendientes() {
        return reglaRepository.findByAceptadaFalse();
    }

    // Aceptar o rechazar regla (actualizar estado)
    @PutMapping("/{id}/aceptar")
    public ResponseEntity<Regla> aceptarRegla(@PathVariable Long id, @RequestParam boolean aceptar) {
        return reglaRepository.findById(id)
            .map(regla -> {
                regla.setAceptada(aceptar); // Cambia el estado de la regla
                Regla reglaActualizada = reglaRepository.save(regla);
                return ResponseEntity.ok(reglaActualizada);
            })
            .orElse(ResponseEntity.notFound().build()); // Si no se encuentra la regla, devuelve un 404
    }
}
