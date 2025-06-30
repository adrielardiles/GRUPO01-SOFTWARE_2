package com.edu.roomieyabackend.repository;

import com.edu.roomieyabackend.model.entities.BienComun;
import com.edu.roomieyabackend.model.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BienComunRepository extends JpaRepository<BienComun, Long> {
    List<BienComun> findByUsuario(Usuario usuario); // Encuentra bienes por usuario
}
