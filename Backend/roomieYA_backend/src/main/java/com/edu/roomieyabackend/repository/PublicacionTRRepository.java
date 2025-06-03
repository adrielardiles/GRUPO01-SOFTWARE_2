package com.edu.roomieyabackend.repository;

import com.edu.roomieyabackend.model.PublicacionTREntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PublicacionTRRepository extends JpaRepository<PublicacionTREntity, Long> {
    // Métodos personalizados opcionales si los necesitas
}
