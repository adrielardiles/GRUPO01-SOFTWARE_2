package com.edu.roomieyabackend.repository;

import com.edu.roomieyabackend.model.entities.CitaVisita;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CitaVisitaRepository extends JpaRepository<CitaVisita, Long> {
    // Obtener todas las citas de un usuario
    List<CitaVisita> findByUsuarioId(Long usuarioId);
    // Aquí puedes agregar más métodos personalizados si lo necesitas
}
