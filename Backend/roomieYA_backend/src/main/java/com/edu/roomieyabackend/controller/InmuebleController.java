package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.model.entities.Inmueble;
import com.edu.roomieyabackend.repository.InmuebleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inmuebles")
@CrossOrigin(origins = "*")
public class InmuebleController {

    @Autowired
    private InmuebleRepository inmuebleRepository;

    // POST: crear nuevo inmueble
    @PostMapping
    public Inmueble crearInmueble(@RequestBody Inmueble inmueble) {
        inmueble.setPrivado(true); // TA027: asignar "Privado"
        return inmuebleRepository.save(inmueble);
    }

    // GET: listar todos los inmuebles
    @GetMapping
    public List<Inmueble> obtenerTodos() {
        return inmuebleRepository.findAll();
    }
}
