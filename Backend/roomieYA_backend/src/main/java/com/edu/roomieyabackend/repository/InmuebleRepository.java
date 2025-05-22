package com.edu.roomieyabackend.repository;

import com.edu.roomieyabackend.model.entities.Inmueble;
import com.edu.roomieyabackend.model.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InmuebleRepository extends JpaRepository<Inmueble, Long> {
    @Query("""
    SELECT ui.usuario FROM UsuarioInmueble ui
    WHERE ui.inmueble.id = :inmuebleId AND ui.rol = 'ROOMIE'
""")
    List<Usuario> obtenerRoomiesPorInmueble(@Param("inmuebleId") Long inmuebleId);


}
