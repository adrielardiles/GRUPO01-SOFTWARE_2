package com.edu.roomieyabackend.repository;


import com.edu.roomieyabackend.model.entities.UsuarioInmueble;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsuarioInmuebleRepository extends JpaRepository<UsuarioInmueble, Long> {
    List<UsuarioInmueble> findByUsuarioId(Long usuarioId);
}