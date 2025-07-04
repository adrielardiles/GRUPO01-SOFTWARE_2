package com.edu.roomieyabackend.repository;

import com.edu.roomieyabackend.model.entities.BienComun;
import com.edu.roomieyabackend.model.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BienComunRepository extends JpaRepository<BienComun, Long> {
    // Método para encontrar bienes por usuario
    List<BienComun> findByUsuario(Usuario usuario);
}
