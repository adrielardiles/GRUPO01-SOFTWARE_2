package com.edu.roomieyabackend.repository;

import com.edu.roomieyabackend.model.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Puedes agregar métodos como findByCorreo if necesario
}