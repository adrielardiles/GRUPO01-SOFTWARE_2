package com.edu.roomieyabackend.repository;

import com.edu.roomieyabackend.model.VotacionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;
import com.edu.roomieyabackend.repository.VotacionRepository;


public interface VotacionRepository extends JpaRepository<VotacionEntity, Long> {
    // Devuelve solo las votaciones cuyo estado sea "activa"
    List<VotacionEntity> findByEstadoIgnoreCase(String estado);

    // Devuelve solo las votaciones activas cuyo plazo incluya la fecha actual
    List<VotacionEntity> findByEstadoIgnoreCaseAndFechaInicioBeforeAndFechaFinAfter(
        String estado, LocalDateTime now1, LocalDateTime now2
    );
}