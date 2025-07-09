package com.edu.roomieyabackend.repository;

import com.edu.roomieyabackend.model.entities.Regla;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReglaRepository extends JpaRepository<Regla, Long> {
    List<Regla> findByAceptadaFalse(); // para listar reglas pendientes de aceptación
}
