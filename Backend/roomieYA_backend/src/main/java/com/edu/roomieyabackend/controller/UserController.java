package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:8081") // Ajusta el puerto si es distinto
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> userData) {
        try {
            String correo = userData.get("correo");
            String contrasena = userData.get("contrasena");
            String nombreCompleto = userData.get("nombreCompleto");
            String telefono = userData.get("telefono");

            Usuario usuario = userService.registrarUsuario(correo, contrasena, nombreCompleto, telefono);
            return ResponseEntity.ok(usuario);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> userData) {
        String correo = userData.get("correo");
        String contrasena = userData.get("contrasena");

        Optional<Usuario> usuario = userService.login(correo, contrasena);
        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        } else {
            return ResponseEntity.status(401).body("❌ Correo o contraseña incorrectos");
        }
    }

    @PostMapping("/recover-password")
    public ResponseEntity<String> recoverPassword(@RequestBody Map<String, String> request) {
        String correo = request.get("correo");

        boolean exists = userService.verificarCorreoExistente(correo);
        if (exists) {
            return ResponseEntity.ok("Se ha enviado un enlace de recuperación a tu correo.");
        } else {
            return ResponseEntity.status(404).body("No se encontró una cuenta con ese correo.");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> actualizarUsuario(@RequestBody Map<String, String> userData) {
        try {
            String correo = userData.get("correo");
            String nuevoNombre = userData.get("nombreCompleto");
            String nuevoTelefono = userData.get("telefono");

            Optional<Usuario> usuarioOpt = userService.findByCorreo(correo);

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Usuario no encontrado.");
        }

        Usuario usuario = usuarioOpt.get();
        usuario.setNombreCompleto(nuevoNombre);
        usuario.setTelefono(nuevoTelefono);

        Usuario actualizado = userService.save(usuario);
        return ResponseEntity.ok(actualizado);

    } catch (Exception e) {
        return ResponseEntity.status(500).body("Error al actualizar: " + e.getMessage());
    }
    }

    }
