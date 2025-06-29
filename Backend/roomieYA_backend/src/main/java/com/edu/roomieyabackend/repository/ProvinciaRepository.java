package com.edu.roomieyabackend.repository;

import com.edu.roomieyabackend.model.entities.Provincia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProvinciaRepository extends JpaRepository<Provincia, Long> {
}
