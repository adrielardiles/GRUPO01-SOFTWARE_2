package com.edu.roomieyabackend.repository;

import com.edu.roomieyabackend.model.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Nuevo método para buscar por correo
    Optional<Usuario> findByCorreo(String correo);

    // Nuevo método para login
    Optional<Usuario> findByCorreoAndContrasena(String correo, String contrasena);
}
