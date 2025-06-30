package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.model.entities.BienComun;
import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.service.BienComunService;
import com.edu.roomieyabackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;  // Asegúrate de importar HttpStatus
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bienes")
public class BienComunController {

    @Autowired
    private BienComunService bienComunService;

    @Autowired
    private UserService userService;

    // Subir un bien común
    @PostMapping("/subir")
    public ResponseEntity<BienComun> subirBien(@RequestBody BienComun bienComun, @RequestParam Long usuarioId) {
        Usuario usuario = userService.obtenerUsuarioPorId(usuarioId); // Obtener el usuario
        bienComun.setUsuario(usuario); // Asociar el bien con el usuario
        BienComun nuevoBien = bienComunService.registrarBien(bienComun); // Guardar el bien
        return ResponseEntity.ok(nuevoBien);
    }

    // Obtener los bienes comunes de un usuario
    @GetMapping("/mis-bienes")
public ResponseEntity<List<BienComun>> obtenerMisBienes(@RequestParam Long usuarioId) {
    try {
        Usuario usuario = userService.obtenerUsuarioPorId(usuarioId);  // Obtener el usuario por ID
        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // Si no se encuentra el usuario
        }

        // Obtener los bienes del usuario
        List<BienComun> bienes = bienComunService.obtenerBienesPorUsuario(usuario);
        if (bienes.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(bienes);  // Si no hay bienes, devolver 204 (sin contenido)
        }

        return ResponseEntity.ok(bienes);  // Devolver los bienes encontrados
    } catch (Exception e) {
        // Captura cualquier error y loguea el detalle
        System.out.println("Error al obtener los bienes: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);  // Retornar error 500
    }
}


    }

