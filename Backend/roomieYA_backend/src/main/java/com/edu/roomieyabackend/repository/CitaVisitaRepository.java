package com.edu.roomieyabackend.repository;

import com.edu.roomieyabackend.model.entities.CitaVisita;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CitaVisitaRepository extends JpaRepository<CitaVisita, Long> {
    // Aquí puedes agregar métodos personalizados si los necesitas
}
