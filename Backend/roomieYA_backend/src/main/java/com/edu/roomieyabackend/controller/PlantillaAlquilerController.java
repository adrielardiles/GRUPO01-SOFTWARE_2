package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.model.entities.PlantillaAlquiler;
import com.edu.roomieyabackend.repository.PlantillaAlquilerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plantillas")
@CrossOrigin(origins = "*")
public class PlantillaAlquilerController {

    @Autowired
    private PlantillaAlquilerRepository repository;

    @PostMapping
    public PlantillaAlquiler registrar(@RequestBody PlantillaAlquiler plantilla) {
        return repository.save(plantilla);
    }

    @GetMapping
    public List<PlantillaAlquiler> listar() {
        return repository.findAll();
    }
}
