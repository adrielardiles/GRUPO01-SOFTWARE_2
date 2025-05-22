package com.edu.roomieyabackend.repository;

import com.edu.roomieyabackend.model.entities.Anuncio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnuncioRepository extends JpaRepository<Anuncio, Long> {
    // Puedes agregar métodos de búsqueda por inmueble o tipo si lo necesitas
}