package com.edu.roomieyabackend.repository;

import com.edu.roomieyabackend.model.entities.Anuncio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnuncioRepository extends JpaRepository<Anuncio, Long> {
    List<Anuncio> findByInmuebleId(Long inmuebleId);
}