package com.edu.roomieyabackend.repository;

import com.edu.roomieyabackend.model.entities.LecturaAnuncio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LecturaAnuncioRepository extends JpaRepository<LecturaAnuncio, Long> {
    Optional<LecturaAnuncio> findByAnuncioIdAndRoomieId(Long anuncioId, Long roomieId);
}