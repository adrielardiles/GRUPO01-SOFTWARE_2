package com.edu.roomieyabackend.repository;

import com.edu.roomieyabackend.model.GastoCompartido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GastoCompartidoRepository extends JpaRepository<GastoCompartido, Long> {
    // Puedes agregar métodos personalizados si es necesario
}

