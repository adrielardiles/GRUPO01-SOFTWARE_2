package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.model.Enums.EstadoBien;
import com.edu.roomieyabackend.model.entities.BienComun;
import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.repository.BienComunRepository;
import com.edu.roomieyabackend.service.BienComunService;
import com.edu.roomieyabackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/bienes")
public class BienComunController {

    @Autowired
    private BienComunService bienComunService;

    @Autowired
    private UserService userService;

    @Autowired
    private BienComunRepository bienComunRepository;

    // Subir un bien común
    @PostMapping("/subir")
    public ResponseEntity<BienComun> subirBien(@RequestBody BienComun bienComun, @RequestParam Long usuarioId) {
        Usuario usuario = userService.obtenerUsuarioPorId(usuarioId); // Obtener el usuario
        if (usuario == null) {
            return ResponseEntity.badRequest().body(null);  // Usuario no encontrado
        }
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

    // Editar el estado de un bien
    @PutMapping("/{id}")
    public ResponseEntity<BienComun> editarEstadoBien(@PathVariable Long id, @RequestBody Map<String, String> estado) {
        try {
            // Convertimos el String recibido en 'estado' a un valor de la enumeración EstadoBien
            EstadoBien estadoEnum = EstadoBien.valueOf(estado.get("estado"));  // Aquí se convierte el String a EstadoBien

            Optional<BienComun> bienOptional = bienComunRepository.findById(id);

            if (bienOptional.isPresent()) {
                BienComun bien = bienOptional.get();
                bien.setEstado(estadoEnum);  // Establecemos el estado del bien con el valor convertido
                bienComunRepository.save(bien);  // Guardamos el bien con el nuevo estado
                return ResponseEntity.ok(bien);  // Devolvemos el bien actualizado
            } else {
                return ResponseEntity.notFound().build();  // Si el bien no se encuentra, retornar 404
            }
        } catch (IllegalArgumentException e) {
            // Si el valor de "estado" no es válido, retornar error 400 correctamente
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    // Eliminar un bien
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarBien(@PathVariable Long id) {
        Optional<BienComun> bienOptional = bienComunRepository.findById(id);
        if (bienOptional.isPresent()) {
            bienComunRepository.delete(bienOptional.get());  // Elimina el bien
            return ResponseEntity.ok().build();  // Responde con éxito
        } else {
            return ResponseEntity.notFound().build();  // Si el bien no se encuentra, responde con 404
        }
    }
}
