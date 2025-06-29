package com.edu.roomieyabackend.repository;

import com.edu.roomieyabackend.model.entities.Distrito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DistritoRepository extends JpaRepository<Distrito, Long> {
    List<Distrito> findByProvinciaNombre(String provinciaNombre);
}
