package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.model.Inmueble;
import com.edu.roomieyabackend.repository.InmuebleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inmuebles")
@CrossOrigin(origins = "*")
public class InmuebleController {

    @Autowired
    private InmuebleRepository inmuebleRepository;

    @PostMapping
    public Inmueble crearInmueble(@RequestBody Inmueble inmueble) {
        inmueble.setPrivado(true); // TA027: asignar "Privado"
        return inmuebleRepository.save(inmueble);
    }
}
