package com.edu.roomieyabackend.repository;

import com.edu.roomieyabackend.model.entities.Inmueble;
import com.edu.roomieyabackend.model.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface InmuebleRepository extends JpaRepository<Inmueble, Long> {
    @Query("""
    SELECT ui.usuario FROM UsuarioInmueble ui
    WHERE ui.inmueble.id = :inmuebleId AND ui.rol = 'ROOMIE'
    """)
    List<Usuario> obtenerRoomiesPorInmueble(@Param("inmuebleId") Long inmuebleId);

    @Query("SELECT DISTINCT i.tipo FROM Inmueble i WHERE i.tipo IS NOT NULL")
    List<String> findDistinctTipos();

    @Query("SELECT DISTINCT i.servicios FROM Inmueble i WHERE i.servicios IS NOT NULL")
    List<String> findDistinctServicios();

}
