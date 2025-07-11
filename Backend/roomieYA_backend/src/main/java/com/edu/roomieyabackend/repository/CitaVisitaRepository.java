package com.edu.roomieyabackend.repository;

import com.edu.roomieyabackend.model.entities.CitaVisita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CitaVisitaRepository extends JpaRepository<CitaVisita, Long> {
    // Buscar citas por estado
    List<CitaVisita> findByEstado(String estado);

    // Buscar citas por fecha
    List<CitaVisita> findByFecha(LocalDate fecha);

    // Buscar citas por nombre
    List<CitaVisita> findByNombre(String nombre);

    List<CitaVisita> findByPublicacionId(Long publicacionId);

    // Buscar todas las citas que aún no se les ha enviado recordatorio 24h y su fecha es mañana
    List<CitaVisita> findByRecordatorioEnviado24hFalseAndFecha(LocalDate fecha);

    // Buscar todas las citas que aún no se les ha enviado recordatorio 48h y su fecha es en dos días
    List<CitaVisita> findByRecordatorioEnviado48hFalseAndFecha(LocalDate fecha);

    List<CitaVisita> findByPublicacionIdAndUsuarioId(Long publicacionId, Long id);

}
