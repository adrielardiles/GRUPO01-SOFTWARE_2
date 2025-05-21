package com.edu.roomieyabackend.repository;

import com.edu.roomieyabackend.model.Inmueble;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InmuebleRepository extends JpaRepository<Inmueble, Long> {
}
